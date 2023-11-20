from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models.db import db
from ..models import Member,Product

wishlist_routes = Blueprint('wishlist', __name__)


@login_required
@wishlist_routes.route('/current', methods=['GET'])
def get_wishlist():
    wishlist = current_user.products
    return {'wishlist':[product.to_dict() for product in wishlist]}


@login_required
@wishlist_routes.route('/add/<int:id>', methods=['POST'])
def add_to_wishlist(id):
    # Check if the product exists
    product = Product.query.get(id)
    if not product:
        return jsonify(message='Product not found'), 404

    # Check if item already exists within the wishlist
    if product in current_user.products:
        return jsonify(message='Item already exists in wishlist'), 400

    # Add the product to the user's wishlist
    current_user.products.append(product)
    db.session.commit()

    return jsonify(message='Item added to wishlist'), 200

@login_required
@wishlist_routes.route('/remove/<int:id>', methods=['DELETE'])
def remove_from_wishlist(id):
    # Check if the product exists
    product = Product.query.get(id)
    if not product:
        return jsonify(message='Product not found'), 404

    # Check if item exists in the wishlist
    if product not in current_user.products:
        return jsonify(message='Item not in wishlist'), 400

    # Remove the product from the user's wishlist
    current_user.products.remove(product)
    db.session.commit()

    return jsonify(message='Item removed from wishlist'), 200