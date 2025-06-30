from flask import Flask, jsonify, request, make_response, render_template, send_from_directory
from flask_restx import Resource
from config import app, db, api, jwt, generate_receipt
from models import Game, User, Order, OrderItem, Profile
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import datetime, os

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return app.static_folder % path

if __name__ == '__main__':
    app.run()
    
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

@api.route('/api/login', endpoint='api_login')
class Login(Resource):
    @api.doc(id='login', responses={'200': 'Success', '400': 'Bad Request', '401': 'Unauthorized'})
    def post(self):
        data = request.get_json()
        if not (data.get('username') and data.get('password')):
            return make_response({'error': 'Missing username or password'}, 400)
        
        user = User.query.filter_by(username=data['username']).first()
        
        if user and user.authenticate(data['password']):
            access_token = create_access_token(identity=user.username, expires_delta=datetime.timedelta(days=3))
            return {'access_token': access_token, 'user': user.to_dict()}, 200
        
        response= make_response({'error': 'Invalid username or password'}, 401) 
        response.message = 'Invalid username or password'
        return response
    
@api.route('/api/signup', endpoint='api_signup')
class Signup(Resource):
    @api.doc(id='signup', responses={'201': 'Success', '400': 'Bad Request'})
    def post(self):
        data = request.get_json()
        
        keys = ('username', 'email', 'password', 'age', 'gender')
        
        for key in keys:
            if key not in data.keys():
                return make_response({'error': 'Invalid credentials'}, 400)
        
        if User.query.filter_by(username=data['username']).first():
            return make_response({'error': 'Username already exists'}, 400)
        
        if User.query.filter_by(email=data['email']).first():
            return make_response({'error': 'Email already exists'}, 400)
        
        user = User(username=data['username'], email=data['email'], age=data['age'], gender=data['gender'])
        profile = Profile()
        user.profile = profile
        
        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201, {'Content-Type': 'application/json'})
    
@api.route('/api/reset_password', endpoint='api_reset_password')
class ResetPassword(Resource):
    @api.doc(id='reset_password', responses={'200': 'Success', '400': 'Bad Request', '404': 'User not found'})
    def post(self):
        data = request.get_json()
        if not (data.get('username') and data.get('password') and data.get('email')):
            return make_response({'error': 'Invalid credentials'}, 400)
        user = User.query.filter_by(username = data['username'], email=data['email']).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
    
@api.route('/api/users', endpoint='api_users')
class Users(Resource):
    # @api.doc(id='users', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        users = User.query.all()
        return make_response([u.to_dict() for u in users if u.username != user.username ], 200, {'Content-Type': 'application/json'})
    
    
@api.route('/api/wishlist', endpoint='api_wishlist')
class Wishlist(Resource):
    @api.doc(id='get wishlist', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([g.to_dict() for g in user.games if not g.purchased], 200, {'Content-Type': 'application/json'})
    
    @api.doc(id='add game to wishlist', security='Bearer', responses={'201': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if not (data['name'] and data['api_game_id']):
            return make_response({'error': 'Missing name or api_game_id'}, 400)
        
        game = Game.query.filter_by(name=data['name']).first()
        if not game:
            game = Game(name=data['name'], api_game_id=data['api_game_id'])   
            game.user = user
            db.session.add(game)
            db.session.commit()
            return make_response(game.to_dict(), 201, {'Content-Type': 'application/json'})
        elif game.purchased:
            return make_response({'error': 'Game already purchased'}, 400)
        else:
            return make_response({'error': 'Game already in wishlist'}, 400)
        
    
@api.route('/api/wishlist/<int:id>', endpoint='api_wishlist_by_id')
class WishlistByID(Resource):
    @api.doc(id='delete game from wishlist', params={'id': 'API Game ID'},security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def delete(self, id):
        game = Game.query.filter_by(api_game_id = id).first()
        if not game or game.purchased:
            return make_response({'error': 'Game not in wishlist'}, 400)
        db.session.delete(game)
        db.session.commit()
        return make_response({'message': 'Game deleted'}, 200, {'Content-Type': 'application/json'})
    
@api.route('/api/library', endpoint='api_library')
class Library(Resource):
    @api.doc(id='get games in Library', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([g.to_dict() for g in user.games if g.purchased], 200, {'Content-Type': 'application/json'})
    
    @api.doc(id='add game to library', security='Bearer', responses={'201': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def post(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        data = request.get_json()
        if not (data['name'] and data['api_game_id']):
            return make_response({'error': 'Missing name or api_game_id'}, 400)
        
        game = Game.query.filter_by(name=data['name']).first()
        if not game:
            game = Game(name=data['name'], api_game_id=data['api_game_id'])   
            game.user = user
            db.session.add(game)
            db.session.commit()
            return make_response(game.to_dict(), 201, {'Content-Type': 'application/json'})
        elif game.purchased:
            return make_response({'error': 'Game already purchased'}, 400)
        else:
            return make_response({'error': 'Game already in wishlist'}, 400)
        
@api.route('/api/library/<int:id>', endpoint='api_id')
class LibraryByID(Resource):
    @api.doc(id='delete game from library', params={'id': 'Game ID'},security='Bearer', responses={'200': 'Success', '400': 'Bad Request', '404': 'Not Found'})
    @jwt_required()
    def delete(self, id):
        game = Game.query.filter_by(id=id).first()
        if not game or game.purchased:
            return make_response({'error': 'Game not in library'}, 404)
        
        db.session.delete(game)
        db.session.commit()
        return make_response(game.to_dict(), 200, {'Content-Type': 'application/json'})
    
@api.route('/api/orders', endpoint='api_orders')
class Orders(Resource):
    @api.doc(id='get orders', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([o.to_dict() for o in user.orders], 200, {'Content-Type': 'application/json'})
    
    @api.doc(id='create order', security='Bearer', responses={'201': 'Success', '400': 'Bad Request', '404': 'Cart not found'})
    @jwt_required()
    def post(self):
        # data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        cart = Order.query.filter_by(status='pending').first()
        if not cart:
            make_response({'error': 'Cart not found'}, 404)
        
        order = Order(status='pending')
        order.user = user
        cart.status = 'completed'
        cart.receipt = generate_receipt()
        for item in cart.order_items:
            game = Game(name=item.name, api_game_id=item.api_game_id, purchased=True)
            game.user = user
            db.session.add(game)
            db.session.commit()
        db.session.add_all([order, cart])
        db.session.commit()
        return make_response(cart.to_dict(), 201, {'Content-Type': 'application/json'})
        
@api.route('/api/orders/<int:order_id>', endpoint='api_order')
class OrderByID(Resource):
    @api.doc(id='get order', params={'order_id': 'Order ID'}, security='Bearer', responses={'200': 'Success', '400': 'Bad Request', '404': 'Order not found'})
    @jwt_required()
    def get(self, order_id):
        order = Order.query.filter_by(id=order_id).first()
        if not order:
            return make_response({'error': 'Order not found'}, 404)
        return make_response(order.to_dict(), 200, {'Content-Type': 'application/json'})
          
    
@api.route('/api/games', endpoint='api_games')
class Games(Resource):
    @api.doc(id='get games', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([g.to_dict() for g in user.games], 200, {'Content-Type': 'application/json'})
    
@api.route('/api/check_login', endpoint='api_check_login')
class CheckLogin(Resource):
    @api.doc(id='check login', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if user:
            return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
        return make_response({'error': 'Token is invalid'}, 400)
    
@api.route('/api/cart', endpoint='api_cart')
class Cart(Resource):
    @api.doc(id='get cart', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        cart = Order.query.filter_by(status='pending').first()
        if not cart:
            return make_response([], 200, {'Content-Type': 'application/json'})
        
        return make_response([g.to_dict() for g in cart.order_items], 200, {'Content-Type': 'application/json'})
    
    @api.doc(id='add game to cart', security='Bearer', responses={'201': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        cart = Order.query.filter_by(status='pending').first()
        for key in ('api_game_id', 'name', 'price', 'img_url'):
            if key not in data.keys():
                return make_response({'error': f'Missing {key}'}, 400)
            
        if not cart:
            cart = Order(status='pending')
            cart.user = user
            db.session.add(cart)
            db.session.commit()
            
        item = OrderItem(api_game_id=data['api_game_id'], name=data['name'], price=data['price'], img_url=data['img_url'])
        item.order = cart
        db.session.add(item)
        db.session.commit()
        cart.order_items.append(item)
        db.session.add(cart)
        db.session.commit()
        return make_response(item.to_dict(), 201, {'Content-Type': 'application/json'})

@api.route('/api/cart/<int:id>', endpoint='api_cart_by_id')
class CartByID(Resource):
    @api.doc(id='delete game from cart', params={'id': 'Item ID'},security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    def delete(self, id):
        cart = Order.query.filter_by(status='pending').first()
        if not cart:
            return make_response({'error': 'Cart not found'}, 400)
        item = OrderItem.query.filter_by(id=id).first()
        if not item:
            return make_response({'error': 'Item not found'}, 400)
        db.session.delete(item)
        db.session.commit()
        return make_response({'message': 'Item deleted'}, 200, {'Content-Type': 'application/json'})
    
@api.route('/api/me', endpoint='api_me')
class Me(Resource):
    @api.doc(id='get logged in user', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
    
    @api.doc(id='update logged in user', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def patch(self):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        for key, value in data['user'].items():
            setattr(user, key, value)
        for key, value in data['profile'].items():
            setattr(user.profile, key, value)
        db.session.add(user)
        db.session.add(user.profile)
        db.session.commit()
        return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
    
@api.route('/api/friends', endpoint='api_friends')
class Friends(Resource):
    @api.doc(id='get friends', security='Bearer', responses={'200': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([f.to_dict() for f in user.friends], 200, {'Content-Type': 'application/json'})
    
    @api.doc(id='add friend', security='Bearer', responses={'201': 'Success', '400': 'Bad Request'})
    @jwt_required()
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        friend = User.query.filter_by(username=data['username']).first()
        if not friend:
            return make_response({'error': 'User not found'}, 404)
        user.friends.append(friend)
        friend.friends.append(user)
        db.session.add_all([user, friend])
        db.session.commit()
        return make_response(friend.to_dict(), 201, {'Content-Type': 'application/json'})
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
