from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Member, Order, Product,OrderDetail
from ..forms.quantity_form import QuantityForm
from datetime import datetime

# All Users should view all products in their cart.
# All Users should add, remove, and clear products in the cart.
# As a member and a seller, I can complete a transaction to purchase.
# As an unauthenticated User, I will be redirected to the signup/login page if I try to complete a transaction.

order_routes = Blueprint('orders', __name__, url_prefix='/orders')

#get user's shopping cart
@order_routes.route("/cart")
@login_required
def get_shopping_cart():
    shopping_cart = [order for order in current_user.orders if order.purchased==False]
    return {"cart": shopping_cart[0].to_dict() if shopping_cart else None}

##get user's past orders
@order_routes.route("/past")
@login_required
def get_past_orders():
        past_orders = [order for order in current_user.orders if order.purchased==False]
        return {"orders": [order.to_dict() for order in past_orders] if past_orders else None}




#add to user's shopping cart
@order_routes.route('/products/<int:id>/add', methods=["POST"])
@login_required
def add_to_shopping_cart(id):

    shopping_cart = [order for order in current_user.orders if order.purchased==False]
    product = Product.query.get(id)
    form  = QuantityForm()
    quantity = form.data['quantity']

    #if user already has a cart in progress
    if shopping_cart:
        cart=shopping_cart[0]
        # search through cart to see if product exists
        for product in cart.products:
             #if product exists
             if product.id == id:
                  #add to already existing quantity
                  product.quantity+=quantity
        #if product doesn't exist in shopping cart
        new_order_detail=OrderDetail(quantity=quantity)
        new_order_detail.product=product
        cart.products.append(new_order_detail)
    #if there is no order in progress
    else:
         new_order_detail=OrderDetail(quantity=quantity)
         new_order_detail.product=product
         new_order = Order(
              purchase_date=datetime.now(),
              purchased=False,
              member=current_user,
              products=[new_order_detail]
         )
         db.session.add(new_order)
    db.session.commit()
    return shopping_cart if shopping_cart else new_order


#remove from user's shopping cart
# @order_routes.route('/remove', moethods=["DELETE"])
# @login_required #?
# def remove_from_shopping_cart(id):

#     #product/id/remove
#     #not delete product, but remove from shopping-cart

#     user_orders = current_user.orders
#     product = Product.query.get(id)

#     #might need quantity
#     user_orders.remove(product) #removes all or one?

#     return user_orders


#how are we going to get quanityt from our frontend to our database



#get user's shopping cart

#add to user's shopping cart
# order-details

#remove from user's shopping cart
# order-details
# delete
