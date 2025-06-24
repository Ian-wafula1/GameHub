from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import func
from .UserGame import user_games

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    api_game_id = db.Column(db.String, nullable=False)
    purchased = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=func.now())
    date_of_purchase = db.Column(db.DateTime)
    
    users = db.relationship('User', back_populates='games', secondary=user_games)