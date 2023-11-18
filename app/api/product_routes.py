from flask import Blueprint, request, jsonify
# from ..models.products import Product
from flask_login import current_user, login_required
from ..models import db, Member, Product
from ..forms.product_form import ProductForm
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

products = Blueprint("products",__name__,url_prefix='/products')

#get all products
@products.route('/all')
def get_all_products():
    products = Product.query.filter(Product.available>0).order_by(Product.category).all()
    print(products)
    #list_dict_products = [products.to_dict() for product in products]
    # calll todict() method on each invidual Product object in listtt
    list_dict_products = [product.to_dict() for product in products]
    print(list_dict_products)
    return {"products":list_dict_products}


#get product description
@products.route('/<int:id>')
# why are we not passing id in the paramater??
def get_product_details(id):
    product = Product.query.get(id)
    # print(product.to_dict_descriptive())
    
    # if returning none
    if product is None:
        return {"message": "Product doesn't exist"}, 404
    return {"product":product.to_dict_descriptive()}

#create a product
@login_required
@products.route('/new',methods=['POST'])
def create_new_product():
    # get current user using flask-login
    #seller,origin_city,origin_state comes from current_user
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # imported current_user, no need to create variablee
    # current_user=0
    # remember, if you have an if statement, you must have an else statement as will. 
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

        db.session.add(newProduct)
        db.session.commit()

        return {"product": newProduct.to_dict_descriptive()}
    else:
        return {"errors": form.errors}, 400

@products.route('/current', methods=['GET'])
@login_required
def get_user_products():
    user_products = Product.query.filter_by(seller=current_user.id).all()
    return {"products": [product.to_dict() for product in user_products]}

#update a product
@login_required
@products.route('/<int:id>',methods=['PUT'])
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
@products.route('/<int:id>', methods=['DELETE'])
def delete_product(id):

    product = Product.query.get(id)

    if product is None:
        return {'message': "Product doesn't exist"}, 404

    if current_user.id != product.seller:
        return {'message': "You do not have permission to delete this product"}, 403

    db.session.delete(product)
    db.session.commit()

    return {'message': 'Product deleted successful'}, 200