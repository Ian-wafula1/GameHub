from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import func

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    api_game_id = db.Column(db.String, nullable=False)
    purchased = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=func.now())
    date_of_purchase = db.Column(db.DateTime)
    
    user = db.relationship('User', back_populates='games')
    
    serialize_rules = ('-user.games',)