from config import db
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import func

class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    api_game_id = db.Column(db.String, default='')
    price = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=func.now())
    updated_at = db.Column(db.DateTime, default=func.now())
    
    order = db.relationship('Order', back_populates='order_items')