from flask import Blueprint, jsonify, session, request
from app.models import Member, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
#flask_login variables current_user, login_user, logout_user, login_required #DO NOT CHANGE THESE TO MEMBER


auth_routes = Blueprint('auth', __name__)


#register blueprint into our api__init__.py


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = [] #create error list
    for field in validation_errors: #for each field in validation errors
        for error in validation_errors[field]: #for each error in field
            errorMessages.append(f'{field} : {error}') #add field/error to error messages
    return errorMessages #return


@auth_routes.route('/')  #authentication for home route
def authenticate():
    """
    Authenticates a member.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        member = Member.query.filter(Member.email == form.data['email']).first() #member
        login_user(member)
        return member.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@auth_routes.route('/logout')
def logout():
    """
    Logs a member out
    """
    logout_user()
    return {'message': 'Member logged out'}



@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new member and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        member = Member(
            first_name = form.data['first_name'],
            last_name = form.data['last_name'],

            email=form.data['email'],
            password=form.data['password'],

            address = form.data['address'],
            city = form.data['city'],
            state = form.data['state'],
            seller = form.data['seller'],
            #default in case account balance is not provided
            account_balance = form.data['account_balance'] if form.data['account_balance'] else 3000
        )

        db.session.add(member)
        db.session.commit()
        login_user(member)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
