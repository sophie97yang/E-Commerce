import os
from flask import Flask,request,redirect
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_migrate import Migrate
from flask_login import LoginManager
from .config import Config
from .models import db,Member
from .api import bp
from .seeds import seed_commands


app = Flask(__name__,static_folder='../react-app/build', static_url_path='/')
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return Member.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

#config app using Configuration model
app.config.from_object(Config)



db.init_app(app)
migrate = Migrate(app, db)


app.register_blueprint(bp)

#application security
CORS(app)


@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
