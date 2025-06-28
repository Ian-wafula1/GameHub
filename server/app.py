from flask import Flask, jsonify, request, make_response
from flask_restx import Resource
from config import app, db, api, jwt, generate_receipt
from models import Game, User, Order, OrderItem
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import datetime

@api.route('/login', endpoint='login')
class Login(Resource):
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
    
@api.route('/signup', endpoint='signup')
class Signup(Resource):
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
        user.password_hash = data['password']
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201, {'Content-Type': 'application/json'})
    
@api.route('/reset_password', endpoint='reset_password')
class ResetPassword(Resource):
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
    
@api.route('/users', endpoint='users')
class Users(Resource):
    # @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
        # return make_response({'test': 'test'}, 200, {'Content-Type': 'application/json'})
    
    @jwt_required()
    def patch(self):
        data = request.get_json()
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        for key, value in data.items():
            setattr(user, key, value)
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
    
    @jwt_required()
    def delete(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if not user:
            return make_response({'error': 'User not found'}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({'message': 'User deleted'}, 200)


@api.route('/wishlist', endpoint='wishlist')
class Wishlist(Resource):
    
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([g.to_dict() for g in user.games if not g.purchased], 200, {'Content-Type': 'application/json'})
    
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
        
    
@api.route('/wishlist/<int:id>', endpoint='wishlist_by_id')
class WishlistByID(Resource):
    @jwt_required()
    def patch(self, id):
        data = request.get_json()
        game = Game.query.filter_by(id=id).first()
        if not game or game.purchased:
            return make_response({'error': 'Game not in wishlist'}, 404)
        
        for key, value in data.items():
            setattr(game, key, value)
        db.session.add(game)
        db.session.commit()
        return make_response(game.to_dict(), 200, {'Content-Type': 'application/json'})
    
    @jwt_required()
    def delete(self, id):
        game = Game.query.filter_by(api_game_id = id).first()
        if not game or game.purchased:
            return make_response({'error': 'Game not in wishlist'}, 400)
        db.session.delete(game)
        db.session.commit()
        return make_response({'message': 'Game deleted'}, 200, {'Content-Type': 'application/json'})
    
@api.route('/library', endpoint='library')
class Library(Resource):
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([g.to_dict() for g in user.games if g.purchased], 200, {'Content-Type': 'application/json'})
    
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
        
@api.route('/library/<int:id>', endpoint='id')
class LibraryByID(Resource):
    @jwt_required()
    def patch(self, id):
        data = request.get_json()
        game = Game.query.filter_by(id=id).first()
        if not game or not game.purchased:
            return make_response({'error': 'Game not in library'}, 404)
        
        for key, value in data.items():
            setattr(game, key, value)
        db.session.add(game)
        db.session.commit()
        return make_response(game.to_dict(), 200, {'Content-Type': 'application/json'})
    
    @jwt_required()
    def delete(self, id):
        game = Game.query.filter_by(id=id).first()
        if not game or game.purchased:
            return make_response({'error': 'Game not in library'}, 404)
        
        db.session.delete(game)
        db.session.commit()
        return make_response(game.to_dict(), 200, {'Content-Type': 'application/json'})
    
@api.route('/orders', endpoint='orders')
class Orders(Resource):
    
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([o.to_dict() for o in user.orders], 200, {'Content-Type': 'application/json'})
    
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
        
@api.route('/orders/<int:order_id>', endpoint='order')
class OrderByID(Resource):
    
    @jwt_required()
    def get(self, order_id):
        order = Order.query.filter_by(id=order_id).first()
        if not order:
            return make_response({'error': 'Order not found'}, 404)
        return make_response(order.to_dict(), 200, {'Content-Type': 'application/json'})
        
    @jwt_required()
    def delete(self, order_id):
        order = Order.query.filter_by(id=order_id).first()
        if not order:
            return make_response({'error': 'Order not found'}, 404)
        db.session.delete(order)
        db.session.commit()
        return make_response(order.to_dict(), 200, {'Content-Type': 'application/json'})
    
    @jwt_required()
    def patch(self, order_id):
        data = request.get_json()
        order = Order.query.filter_by(id=order_id).first()
        if not order:
            return make_response({'error': 'Order not found'}, 404)
        for attr in data:
            setattr(order, attr, data[attr])
        db.session.add(order)
        db.session.commit()
        return make_response(order.to_dict(), 200, {'Content-Type': 'application/json'})
    
@api.route('/orders/<int:order_id>/items', endpoint='order_items')
class OrderItems(Resource):
    @jwt_required()
    def get(self, order_id):
        order = Order.query.filter_by(id=order_id).first()
        if not order:
            return make_response({'error': 'Order not found'}, 404)
        return make_response([o.to_dict() for o in order.order_items], 200, {'Content-Type': 'application/json'})
        
    
@api.route('/games', endpoint='games')
class Games(Resource):
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        return make_response([g.to_dict() for g in user.games], 200, {'Content-Type': 'application/json'})
    
@api.route('/check_login', endpoint='check_login')
class CheckLogin(Resource):
    @jwt_required()
    def get(self):
        user = User.query.filter_by(username=get_jwt_identity()).first()
        if user:
            return make_response(user.to_dict(), 200, {'Content-Type': 'application/json'})
        return make_response({'error': 'Token is invalid'}, 400)
    
@api.route('/cart', endpoint='cart')
class Cart(Resource):
    @jwt_required()
    def get(self):
        cart = Order.query.filter_by(status='pending').first()
        if not cart:
            return make_response([], 200, {'Content-Type': 'application/json'})
        
        return make_response([g.to_dict() for g in cart.order_items], 200, {'Content-Type': 'application/json'})
    
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

@api.route('/cart/<int:id>', endpoint='cart_by_id')
class CartByID(Resource):
    def delete(self, id):
        cart = Order.query.filter_by(status='pending').first()
        if not cart:
            return make_response({'error': 'Cart not found'}, 400)
        item = OrderItem.query.filter_by(api_game_id=id).first()
        if not item:
            return make_response({'error': 'Item not found'}, 400)
        db.session.delete(item)
        db.session.commit()
        return make_response({'message': 'Item deleted'}, 200, {'Content-Type': 'application/json'})
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)
