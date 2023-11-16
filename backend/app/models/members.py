from .db import db
from .wishlists import wishlists

class Member(db.Model):
    __tablename__= "members"
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(30), nulalble=False)
    password = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    seller = db.Column(db.Boolean, nullable=False)

    #members to reviews are not a 1 to 1 - it's one to many so we need to remove uselist!
    reviews = db.relationship("Review", back_populates="member")
    orders = db.relationship("Order",back_populates='member')
    products = db.relationship("Product",secondary=wishlists,back_populates='members')

    seller_products = db.relationship("Product",back_populates="seller")
