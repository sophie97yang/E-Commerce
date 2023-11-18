from flask.cli import AppGroup
from .members import seed_members, undo_members
from .products import seed_products, undo_products
from .reviews import seed_reviews,undo_reviews
from .wishlists import seed_wishlists,undo_wishlists
from .orders import seed_orders,undo_orders



from ..models  import db, environment, SCHEMA

seed_commands = AppGroup("seed")


@seed_commands.command("all")
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_members()
        undo_products()
        undo_reviews()
        undo_orders()
        undo_wishlists()

    members=seed_members()
    print("here is the seeders for members--------->", members)
    products = seed_products()
    print("here is the seeders for members--------->", products)
    seed_reviews()
    seed_orders(members,products)
    seed_wishlists(members,products)
    print("SEEDED COMPLETEEE")



@seed_commands.command("undo")
def undo_seeds():
    undo_wishlists()
    undo_orders()
    undo_reviews()
    undo_products()
    undo_members()




    print("UNSEEDED")
