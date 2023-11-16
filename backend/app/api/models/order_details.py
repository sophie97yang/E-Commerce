from .db import db

order_details = db.Table(
    "order_details",
    db.Model.metadata,
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True),
    db.Column("shoppingcart_id", db.Integer, db.ForeignKey("shopping_carts.id"), primary_key=True)
)
class OrderDetail(db.Model):
    __tablename__= "order_details"
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, ForeignKey=("products.id"))
    shoppingCart_id = db.Column(db.Integer, ForeignKey=("shopping_carts.id"))
