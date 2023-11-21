from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .wishlists import wishlists

class Member(db.Model, UserMixin):
    __tablename__= "members"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    seller = db.Column(db.Boolean, nullable=False)
    account_balance = db.Column(db.Float, default=3000)

    #members to reviews are not a 1 to 1 - it's one to many so we need to remove uselist!
    orders = db.relationship("Order", back_populates="member")
    reviews = db.relationship("Review", back_populates="member")
    products = db.relationship("Product", secondary=wishlists, back_populates='members')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    # get user without reviews,orders,wishlist
    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "seller": self.seller,
            "account_balance": self.account_balance

        }

    def to_dict_descriptive(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "seller": self.seller,
            "account_balance": self.account_balance,
            "reviews":[review.to_dict() for review in self.reviews],
            "products":[product.to_dict_descriptive() for product in self.products],
            "orders": [order.to_dict() for order in self.orders]
        }
