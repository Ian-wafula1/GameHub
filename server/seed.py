from models import Game, User, Order, OrderItem
from config import db, app
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import datetime

from sqlalchemy.sql import func

with app.app_context():
    Game.query.delete()
    User.query.delete()
    Order.query.delete()
    OrderItem.query.delete()

    # user = User(username='admin', password='password')
    # db.session.add(user)
    # db.session.commit()

    # access_token = create_access_token(identity=user.username, expires_delta=datetime.timedelta(days=1))
    # print(access_token)