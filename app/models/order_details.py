from .db import db, environment, SCHEMA, add_prefix_for_prod

order_details = db.Table(
    "order_details",
    db.Model.metadata,
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),
    db.Column("order_id", db.Integer, db.ForeignKey("orders.id"), primary_key=True),
    db.Column("quantity",db.Integer,default=1)
)


# class OrderDetail(db.Model):
#     __tablename__= "order_details"
#     __table_args__ = {'extend_existing': True}

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     quantity = db.Column(db.Integer,default=1)
#     # product_id = db.Column(db.Integer, db.ForeignKey("products.id"),primary_key=True)
#     # order_id = db.Column(db.Integer, db.ForeignKey("orders.id"),primary_key=True)

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "quantity": self.quantity,
#             "product_id": self.product_id,
#             "order_id": self.order_id
#         }
