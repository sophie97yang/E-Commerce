from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Member, Product, Review
from ..forms.review_form import ReviewForm
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


review_routes = Blueprint("reviews",__name__,url_prefix='/reviews')


#get all reviews
@review_routes.route('/all')
def get_all_reviews():
    reviews = Review.query.order_by(Review.review_date.desc()).all()
    return {"reviews":[review.to_dict() for review in reviews]}
