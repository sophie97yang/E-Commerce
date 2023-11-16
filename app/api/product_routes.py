from flask import Blueprint,request
from ..models.products import Product
from ..models import db
from ..forms.product_form import ProductForm


products = Blueprint("products",__name__,url_prefix='/products')

#get all products
@products.route('/all')
def get_all_products():
    products = Product.query.filter(Product.available>0).order_by(Product.category).all()
    print(products)
    list_dict_products = [products.to_dict() for product in products]
    print(list_dict_products)
    return {"products":list_dict_products}

#get product description
@products.route('/<int:id>')
def get_product_details():
    product = Product.query.get(id)
    print(product.to_dict_descriptive())
    return {"product":product.to_dict_descriptive()}

#create a product
@products.route('/new',methods=['POST'])
def create_new_product():
    # get current user using flask-login
    #seller,origin_city,origin_state comes from current_user
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    current_user=0
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
