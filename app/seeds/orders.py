from ..models import db, SCHEMA, environment
from ..models.orders import Order
from ..models.order_details import OrderDetail
from faker import Faker
from random import randint,sample,choice
from sqlalchemy.sql import text


fake = Faker()

def seed_orders(members,products):

    print("SEEDING ORDERS NOWW")
    products_1= sample(products,randint(1,4))
    order_list_1 = []
    for product in products_1:
        order_detail1 = OrderDetail(quantity=randint(1,5))
        order_detail1.product = product
        order_list_1.append(order_detail1)
    

    order1 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products=order_list_1
        
    )
    
    products_2= sample(products,randint(1,4))
    order_list_2 = []
    for product in products_2:
        order_detail2 = OrderDetail(quantity=randint(1,5))
        order_detail2.product = product
        order_list_2.append(order_detail2)

    order2 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= order_list_2
    )

    products_3= sample(products,randint(1,4))
    order_list_3 = []
    for product in products_3:
        order_detail3 = OrderDetail(quantity=randint(1,5))
        order_detail3.product = product
        order_list_3.append(order_detail3)

    order3 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= order_list_3
    )


    products_4= sample(products,randint(1,4))
    order_list_4=[]
    for product in products_4:
        order_detail4 = OrderDetail(quantity=randint(1,5))
        order_detail4.product = product
        order_list_4.append(order_detail4)

    order4 = Order (
        purchase_date=fake.date_between(start_date='-1y', end_date='today'),
        purchased=True,
        member=choice(members),
        products= order_list_4
    )


    products_5= sample(products,randint(1,4))
    order_list_5 = []
    for product in products_5:
        order_detail5 = OrderDetail(quantity=randint(1,5))
        order_detail5.product = product
        order_list_5.append(order_detail5)

    order5 = Order (
        purchased=False,
        member=choice(members),
        products= order_list_5
    )

    products_6= sample(products,randint(1,4))
    order_list_6 = []
    for product in products_6:
        order_detail6 = OrderDetail(quantity=randint(1,5))
        order_detail6.product = product
        order_list_6.append(order_detail6)

    order6 = Order (
        purchased=False,
        member=choice(members),
        products= order_list_6
    )

    products_7= sample(products,randint(1,4))
    order_list_7 = []
    for product in products_7:
        order_detail7 = OrderDetail(quantity=randint(1,5))
        order_detail7.product = product
        order_list_7.append(order_detail7)

    order7= Order (
        purchased=False,
        member=choice(members),
        products= order_list_7
    )

    all_orders = [order1, order2, order3, order4, order5, order6, order7]
    add_orders = [db.session.add(order) for order in all_orders]
    db.session.commit()
    print("SEEDING ORDERS COMPLETE")

    return all_orders

#need to seed order details (modify product quantity)
# def seed_order_details(orders):
#     for order in orders:
#         for product in order.products:



def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))
        db.session.execute(text("DELETE FROM order_details"))

    db.session.commit()
