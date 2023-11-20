from flask import Flask,Blueprint
from .auth_routes import auth_routes
from .member_routes import member_routes
from .product_routes import product_routes
from .review_routes import review_routes
from .order_routes import order_routes
# from .wishlist_routes import wishlist_routes

bp = Blueprint('api',__name__,url_prefix='/api')


#blueprint routes
bp.register_blueprint(auth_routes, url_prefix='/auth')
bp.register_blueprint(member_routes, url_prefix='/members')
bp.register_blueprint(product_routes, url_prefix='/products')
bp.register_blueprint(review_routes,url_prefix='/reviews')
bp.register_blueprint(order_routes, url_prefix='/orders')
# bp.register_blueprint(wishlist_routes, url_prefix='/wishlist')


@bp.route("/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    bp.view_functions[rule.endpoint].__doc__ ]
                    for rule in bp.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list
