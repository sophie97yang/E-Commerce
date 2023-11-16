from .db import db

wishlists = db.Table(
    "wishlists",
    db.Model.metadata,
    db.Column("member_id", db.Integer, db.ForeignKey("members.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True)
)

# class Wishlist(db.Model):
#     __tablename__= "wishlist"

#     id = db.Column(db.Integer, primary_key=True)
#     members_id = db.Column(db.Integer, ForeignKey=("members.id"))
#     product
