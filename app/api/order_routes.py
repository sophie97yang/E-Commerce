
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

#get user's past orders
@order_routes.route("/past")
@login_required
def get_past_orders():
        past_orders = [order for order in current_user.orders if order.purchased==True]
        return {"orders": [order.to_dict() for order in past_orders] if past_orders else None}

#get order by order ID
@order_routes.route("/<int:id>")
def get_order_details(id):
     order = Order.query.get(id)
     return {"order":order.to_dict()}


#add to user's shopping cart
@order_routes.route('/add/<int:id>', methods=["POST"])
@login_required
def add_to_shopping_cart(id):

    shopping_cart = [order for order in current_user.orders if order.purchased==False]
    product_to_add = Product.query.get(id)
    form  = QuantityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        quantity = form.data['quantity']
        #if user already has a cart in progress
        if shopping_cart:
            cart=shopping_cart[0]
            # search through cart to see if product exists
            for product in cart.products:
                #if product exists
                if product.product_id == id:
                  #add to already existing quantity
                    product.quantity+=quantity
                    db.session.commit()
                    return {"cart":cart.to_dict()}
            #if product doesn't exist in shopping cart
            new_order_detail=OrderDetail(quantity=quantity)
            new_order_detail.product = product_to_add
            cart.products.append(new_order_detail)
        #if there is no order in progress
        else:
            new_order_detail=OrderDetail(quantity=quantity)
            new_order_detail.product=product_to_add
            new_order = Order(
                purchased=False,
                member=current_user,
                products=[new_order_detail]
            )
            db.session.add(new_order)

        db.session.commit()
        return {"cart":shopping_cart[0].to_dict() if shopping_cart else new_order.to_dict()}
    return {"errors": form.errors}, 400

#update quantity of product in shopping cart

# remove item from user's shopping cart
@order_routes.route('/remove/<int:id>', methods=["DELETE"])
@login_required
def remove_from_shopping_cart(id):
    shopping_cart = [order for order in current_user.orders if order.purchased==False]
    if shopping_cart:
         cart = shopping_cart[0]
         print(cart.products)
         if len(cart.products)>1:
            for product in cart.products:
                #if product exists
                if product.product_id == id:
                     cart.products.remove(product)
                     order_detail = OrderDetail.query.get(product.id)
                     db.session.delete(order_detail)
                     db.session.commit()
                     return {"cart":cart.to_dict()}
         elif len(cart.products)==1:
              product = cart.products[0]
              order_detail = OrderDetail.query.get(product.id)
              db.session.delete(order_detail)
              db.session.delete(cart)
              db.session.commit()
              return {"message":"Successfully Deleted"}
    return {"errors":"There was an error deleting your order"}

#complete order - transaction
@order_routes.route('/cart/purchase',methods=['POST'])
@login_required
def complete_transaction():
     shopping_cart = [order for order in current_user.orders if order.purchased==False]
     if shopping_cart:
        cart = shopping_cart[0]
        total=0
        for product in cart.products:
             quantity = product.quantity
             product_info = Product.query.get(product.product_id)
             total+=(product_info.price*quantity)
             if(total>current_user.account_balance):
                  return {"errors":"Insufficient Funds"}
             if (product_info.available<quantity):
                  return {"errors":"Low Stock"}
             product_info.available-=quantity
             current_user.account_balance-=total
             seller_account=Member.query.get(product_info.seller)
             seller_account.account_balance+=total
        cart.purchased=True
        cart.purchase_date=datetime.now()

        db.session.commit()
     else:
          return {"errors":"Order Not Found"}

     return {"account_balance":current_user.account_balance, "purchase":cart.to_dict()}
