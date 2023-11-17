from ..models import db
from sqlalchemy.sql import text
from random import choice, sample, randint

def seed_wishlists(members,products):
    for member in members:
        member.products = sample(products,randint(0,len(products)))
def undo_wishlist():
    db.session.execute(text("DELETE FROM wishlists"))
