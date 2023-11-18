from flask import Flask,Blueprint
from .auth_routes import auth_routes
from .member_routes import member_routes
from .product_routes import products

bp = Blueprint('api',__name__,url_prefix='/api')


#blueprint routes
bp.register_blueprint(auth_routes, url_prefix='/auth')
bp.register_blueprint(member_routes, url_prefix='/members')
bp.register_blueprint(products, url_prefix='/products')




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
