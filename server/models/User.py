from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from .Friends import friends

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    age = db.Column(db.Integer, nullable=True)
    gender = db.Column(db.String, nullable=True)
    _password_hash = db.Column(db.String)
    
    profile = db.relationship('Profile', back_populates='user', uselist=False, cascade='all, delete-orphan')
    games = db.relationship('Game', back_populates='user', lazy=True, cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='user', lazy=True, cascade='all, delete-orphan')
    friends = db.relationship('User', secondary=friends, primaryjoin=id==friends.c.user_id, secondaryjoin=id==friends.c.friend_id)
    
    serialize_rules = ('-games.user', '-orders.user', '-profile.user')
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))