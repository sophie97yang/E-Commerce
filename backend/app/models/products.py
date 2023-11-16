from .db import db
from .wishlists import wishlists
from .order_details import order_details

class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer,db.ForeignKey("members.id"))
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(20), nullable=False)
    origin_city = db.Column(db.String(20), nullable=False)
    origin_state = db.column(db.String(20), nullable=False)

    reviews = db.relationship("Review",back_populates='product')
    members = db.relationship("Member",secondary=wishlists,back_populates='products')
    product_images = db.relationship("ProductImage",back_populates="product")
    orders = db.relationship("orders",secondary=order_details,back_populates="products")
    seller = db.relationship("Member",back_populates="seller_products")
