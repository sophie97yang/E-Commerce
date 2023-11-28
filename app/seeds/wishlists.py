from ..models import db, SCHEMA, environment
from sqlalchemy.sql import text
from random import choice, sample, randint



def seed_wishlists(members,products):
    for member in members:
        member.products = sample(products,randint(0,6))

    db.session.commit()


def undo_wishlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlists RESTART IDENTITY CASCADE;") #wishlist / wishlists???
    else:
        db.session.execute(text("DELETE FROM wishlists"))

    db.session.commit()
