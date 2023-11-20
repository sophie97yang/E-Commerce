from flask import Blueprint, request
from flask_login import current_user, login_required
from ..models import db, Member, Product, Review
from ..forms.review_form import ReviewForm
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from datetime import datetime


review_routes = Blueprint("reviews",__name__,url_prefix='/reviews')


#get all reviews
@review_routes.route('/all')
def get_all_reviews():
    reviews = Review.query.order_by(Review.review_date.desc()).all()
    return {"reviews":[review.to_dict_descriptive() for review in reviews]}

#get a review by id
@review_routes.route('/<int:id>')
def get_review_by_id(id):
    review = Review.query.get(id)
    return {"review":review.to_dict_descriptive()}

#get a member's reviews
@review_routes.route('/current')
@login_required
def get_user_reviews():
    return {"reviews":[review.to_dict_descriptive() for review in current_user.reviews]}


#edit a review by id
@review_routes.route('/<int:id>/edit',methods=['PUT'])
@login_required
def edit_review(id):
    review_to_edit = Review.query.get(id)
    if not review_to_edit:
        return {"message":"Review not found"},404
    elif review_to_edit.member_id != current_user.id:
        return {"message":"Forbidden"},403
    else:
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = form.data
            review_to_edit.rating=data['rating']
            review_to_edit.headline=data['headline']
            review_to_edit.content=data['content']
            # should we update the date of the review when review gets updated?
            review_to_edit.review_date=datetime.now()
            db.session.commit()
            return {"review":review_to_edit.to_dict_descriptive()}
        else:
            return {"errors":form.errors},400

#delete a review by id
@review_routes.route('/<int:id>/delete',methods=['DELETE'])
@login_required
def delete_review(id):
    review_to_delete = Review.query.get(id)
    if not review_to_delete:
        return {"message":"Review not found"},404

    elif review_to_delete.member_id != current_user.id:
        return {"message":"Forbidden"},403
    else:
        db.session.delete(review_to_delete)
        db.session.commit()
