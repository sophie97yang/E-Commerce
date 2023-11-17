from flask.cli import AppGroup
from .members import seed_members, undo_members
from .products import seed_products, undo_products
from .reviews import seed_reviews,undo_reviews
from .wishlists import seed_wishlists,undo_wishlist

seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    members=seed_members()
    products = seed_products()
    seed_reviews()
    seed_wishlists(products,members)
    print("SEEDED")



@seed_commands.command("undo")
def undo_seeds():
    undo_members()
    undo_products()
    undo_reviews()
    undo_wishlist()
    print("UNSEEDED")
