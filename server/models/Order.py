from config import db
from sqlalchemy_serializer import SerializerMixin

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String, default='pending')
    updated_at = db.Column(db.DateTime, default=db.func.now())
    
    user = db.relationship('User', back_populates='orders', lazy=True)
    order_items = db.relationship('OrderItem', back_populates='order', lazy=True, cascade='all, delete-orphan')
    
    serialize_rules = ('-users.orders', '-order_items.order')
    
    @property
    def total_price(self):
        return sum([x.price for x in self.order_items])
        