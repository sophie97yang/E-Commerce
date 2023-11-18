from .db import db, environment, SCHEMA, add_prefix_for_prod
from .order_details import order_details

class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    purchase_date = db.Column(db.Date)
    purchased = db.Column(db.Boolean, nullable=False,default=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"))

    member = db.relationship("Member", back_populates="orders")
    products = db.relationship("Product", secondary=order_details, back_populates="orders")


    def to_dict(self):
        return {
            "id": self.id,
            "purchase_date": self.purchase_date,
            "purchased": self.purchased,
            "member": self.member,
            "products":[product.to_dict() for product in self.products]
        }

    def to_dict_descriptive(self):
        return {
            "id": self.id,
            "purchase_date": self.purchase_date,
            "purchased": self.purchased,
            "member": self.member,
            "products":[product.to_dict_descriptive() for product in self.products]
        }
