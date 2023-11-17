from .db import db
from .order_details import order_details

class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True)
    purchase_date = db.Column(db.Date, nullable=False)
    purchased = db.Column(db.Boolean, nullable=False)
    member_id = db.Column(db.Integer, ForeignKey=("members.id"))

    member = db.relationship("Member",back_populates="orders")
    products = db.relationship("Product",secondary=order_details,back_populates="orders")


    def to_dict(self):
        return {
            "id": self.id,
            "purchase_date": self.purchase_date,
            "purchased": self.purchased,
            "member_id": self.member_id
        }