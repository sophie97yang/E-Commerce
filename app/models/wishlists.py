from .db import db, environment, SCHEMA, add_prefix_for_prod

wishlists = db.Table(
    "wishlists",
    db.Model.metadata,
    db.Column("member_id", db.Integer, db.ForeignKey(add_prefix_for_prod("members.id")), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), primary_key=True)
)

if environment == "production":
    wishlists.schema = SCHEMA
