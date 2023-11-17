from ..models import db
from ..models.orders import Order
from ..models.order_details import OrderDetail
from faker import Faker
from random import randint,sample,choice
from sqlalchemy.sql import text


fake = Faker()

def seed_orders(members,products):
    order1 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    order2 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    order3 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    order4 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    order5 = Order (
        purchased=False,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    order6 = Order (
        purchased=False,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    order7= Order (
        purchased=False,
        member=choice(members),
        products= sample(products,randint(1,4))
    )

    all_orders = [order1, order2, order3, order4, order5, order6, order7]
    add_orders = [db.session.add(order) for order in all_orders]
    db.session.commit()
    return all_orders

#need to seed order details (modify product quantity)
# def seed_order_details(orders):
#     for order in orders:
#         for product in order.products:



def undo_orders():
    db.session.execute(text("DELETE FROM orders"))
    db.session.commit()
