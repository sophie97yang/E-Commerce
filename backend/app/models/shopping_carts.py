from .db import db
from .order_details import order_details

class ShoppingCart(db.Model):
    __tablename__ = "shoppingCart"
    id = db.Column(db.Integer, primary_key=True)
    purchase_date = db.Column(db.Date, nullable=False)
    purchased = db.Column(db.Boolean, nullable=False)
    member_id = db.Column(db.Integer, ForeignKey=("members.id"))

    member = db.relationship("Member",back_populates="shopping_carts")
    products = db.relationship("Product",secondary=order_details,back_populates="shopping_carts")
