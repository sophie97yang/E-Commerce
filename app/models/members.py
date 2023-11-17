from .db import db
from .wishlists import wishlists

class Member(db.Model):
    __tablename__= "members"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(30), nulalble=False)
    password = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    seller = db.Column(db.Boolean, nullable=False)
    account_balance = db.Column(db.Float, default=3000)

    #members to reviews are not a 1 to 1 - it's one to many so we need to remove uselist!
    reviews = db.relationship("Review", back_populates="member")
    orders = db.relationship("Order",back_populates='member')
    products = db.relationship("Product",secondary=wishlists,back_populates='members')


    # get user without reviews,orders,wishlist
    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "password": self.password,
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
            "password": self.password,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "seller": self.seller,
            "account_balance": self.account_balance,
            "reviews":self.reviews,
            "products":self.products,
            "orders": self.orders
        }
