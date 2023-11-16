from flask import Blueprint
from ..models.products import Product


products = Blueprint("products",__name__,url_prefix='/products')


@products.route('/all')
def get_all_products():
    products = Product.query.filter(Product.available>0).order_by(Product.category).all()
    print(products)
    list_dict_products = [products.to_dict() for product in products]
    print(list_dict_products)
    return {"products":list_dict_products}
