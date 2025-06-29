from config import db
from sqlalchemy_serializer import SerializerMixin

class Profile(db.Model, SerializerMixin):
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bio = db.Column(db.String, nullable=True)
    avatar_url = db.Column(db.String, nullable=True)
    
    user = db.relationship('User', back_populates='profile', lazy=True)
    serialize_rules = ('-user.profile',)