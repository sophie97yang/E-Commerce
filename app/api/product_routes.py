from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from datetime import datetime
from ..models import db, Member, Product,Review
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

product_routes = Blueprint("products",__name__,url_prefix='/products')

#get all products
@product_routes.route('/all')
def get_all_products():
    # products = Product.query.filter(Product.available>0).order_by(Product.category).all()
    # we want all products regardless of availability
    products = Product.query.order_by(Product.category).all()
    list_dict_products = [product.to_dict_descriptive() for product in products]
    print(list_dict_products)
    return {"products":list_dict_products}


# #get product description
# @product_routes.route('/<int:id>')
# def get_product_details(id):
#     product = Product.query.get(id)
#     if product is None:
#         return {"message": "Product doesn't exist"}, 404
#     return {"product":product.to_dict_descriptive()}

#create a product
@login_required
@product_routes.route('/new',methods=['POST'])
def create_new_product():
    #check if current member has a seller status, if not - forbidden
    if current_user.seller==False:
        return {"message":"Forbidden"},403
    else:
        form = ProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = form.data

            newProduct = Product (
                seller=current_user.id,
                name=data["name"],
                description=data["description"],
                price=data["price"],
                category=data["category"],
                origin_city=current_user.city,
                origin_state=current_user.state,
                available=data["available"]
            )

    # mod 6 aws references
            preview_image = form.data["preview_image"]
            preview_image.filename = get_unique_filename(preview_image.filename)
            uploadPreviewImage = upload_file_to_s3(preview_image)

            if "url" not in uploadPreviewImage:
                print(uploadPreviewImage)
                return uploadPreviewImage
            else:
                newProduct.preview_image = uploadPreviewImage["url"]

            product_image1 = form.data["product_image1"]
            product_image1.filename = get_unique_filename(product_image1.filename)
            uploadProductImage1 = upload_file_to_s3(product_image1)

            if "url" not in uploadProductImage1:
                print(uploadProductImage1)
                return uploadProductImage1
            else:
                newProduct.product_image1 = uploadProductImage1["url"]

            product_image2 = form.data["product_image2"]
            product_image2.filename = get_unique_filename(product_image2.filename)
            uploadProductImage2 = upload_file_to_s3(product_image2)

            if "url" not in uploadProductImage2:
                print(uploadProductImage2)
                return uploadProductImage2
            else:
                newProduct.product_image2 = uploadProductImage2["url"]

            product_image3 = form.data["product_image3"]
            product_image3.filename = get_unique_filename(product_image3.filename)
            uploadProductImage3 = upload_file_to_s3(product_image3)

            if "url" not in uploadProductImage3:
                print(uploadProductImage3)
                return uploadProductImage3
            else:
                newProduct.product_image3 = uploadProductImage3["url"]

            product_image4 = form.data["product_image4"]
            product_image4.filename = get_unique_filename(product_image4.filename)
            uploadProductImage4 = upload_file_to_s3(product_image4)

            if "url" not in uploadProductImage4:
                print(uploadProductImage4)
                return uploadProductImage4
            else:
                newProduct.product_image4 = uploadProductImage4["url"]

            db.session.add(newProduct)
            db.session.commit()

            return {"product": newProduct.to_dict_descriptive()}
        else:
            return {"errors": form.errors}, 400



@product_routes.route('/current', methods=['GET'])
@login_required
def get_user_products():
    user_products = Product.query.filter_by(seller=current_user.id).all()
    return {"products": [product.to_dict() for product in user_products]}

#update a product
@login_required
@product_routes.route('/<int:id>',methods=['PUT'])
def update_product(id):

    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404


    if current_user.id != product.seller:
        return {'message': "You do not have permission to update this product"}, 403



    # get current user using flask-login
    #seller,origin_city,origin_state comes from current_user
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # imported current_user, no need to create variablee
    # current_user=0
    # remember, if you have an if statement, you must have an else statement as will.
    if form.validate_on_submit():
        data = form.data

        product.seller=current_user.id
        product.name=data["name"]
        product.description=data["description"]
        product.price=data["price"]
        product.category=data["category"]
        product.origin_city=current_user.city
        product.origin_state=current_user.state
        product.available=data["available"]


        db.session.commit()

        return {"product": product.to_dict_descriptive()}
    else:
        return {"errors": form.errors}, 400


@login_required
@product_routes.route('/<int:id>', methods=['DELETE'])
def delete_product(id):

    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404

    if current_user.id != product.seller:
        return {'message': "You do not have permission to delete this product"}, 403

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product deleted successful'}, 200

#get a product's review
@product_routes.route('/<int:id>/reviews')
def get_product_reviews(id):
    product = Product.query.get(id)
    return {"reviews":review.to_dict() for review in product.reviews}

#add a review to a product
@product_routes.route('/<int:id>/reviews/new', methods=['POST'])
@login_required
def add_product_review(id):
    product = Product.query.get(id)
    #if current user is the seller of product, throw error
    if product.seller== current_user.id:
        return {"message":"Forbidden"},403

    # existing_review = Review.query.filter_by(product_id=id, member_id=current_user.id).first()
    # if existing_review:
    #     return {"message": "You have already left a review for this product"}, 400
    #what if user has already left a review? redirect them to updating their review?
    #I guess they can leave multiple reviews
    #else proceed with creating a review
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_review = Review (
            rating=data['rating'],
            headline=data['headline'],
            content=data['content'],
            review_date= datetime.now(),
            product_id=id,
            member_id=current_user.id
        )
        if data['review_image']:
            review_image = data["review_image"]
            review_image.filename = get_unique_filename(review_image.filename)
            uploadReviewImage = upload_file_to_s3(review_image)

            if "url" not in uploadReviewImage:
                print(uploadReviewImage)
                return uploadReviewImage
            else:
                new_review.review_image = uploadReviewImage["url"]

        db.session.add(new_review)
        db.session.commit()
        return {"review":new_review.to_dict_descriptive()}
    return {"errors":form.errors},400
