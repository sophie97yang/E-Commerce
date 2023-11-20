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
    product_id = request.json.get('product_id')

    # Check if item already exists within the wishlist
    existing_item = db.session.query(wishlists).filter_by(
        member_id=current_user.id,
        product_id=product_id
    ).first()

    if existing_item:
        return jsonify(message='Item already exists in wishlist'), 400

    # Insert the new item
    new_item = wishlists.insert().values(member_id=current_user.id, product_id=product_id)
    db.session.execute(new_item)
    db.session.commit()

    return jsonify(message='Item added to wishlist'), 200

# @login_required
# @wishlist_routes.route('/remove', methods=['DELETE'])
# def remove_from_wishlist():
#     product_id = request.json.get('product_id')

#     # Delete the item
#     delete_item = wishlists.delete().where(
#         wishlists.c.member_id == current_user.id,
#         wishlists.c.product_id == product_id
#     )
#     db.session.execute(delete_item)
#     db.session.commit()

#     return jsonify(message='Item removed from wishlist'), 200
