# from flask_wtf import FlaskForm
# from wtforms import StringField,BooleanField, SubmitField
# from wtforms.validators import DataRequired


# #?
# def user_exists(form, field):
#     # Checking if user exists
#     email = field.data
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('Email provided not found.')

# #?
# def password_matches(form, field):
#     # Checking if password matches
#     password = field.data
#     email = form.data['email']
#     user = User.query.filter(User.email == email).first()
#     if not user:
#         raise ValidationError('No such user exists.')
#     if not user.check_password(password):
#         raise ValidationError('Password was incorrect.')


# class LoginForm(FlaskForm):
#     first_name = StringField("First Name",validators=[DataRequired()])
#     last_name = StringField("Last Name", validators=[DataRequired()])
#     email = StringField("Email", validators=[DataRequired()])
#     password = StringField("Password", validators=[DataRequired()])
#     address = StringField("Address", validators=[DataRequired()])
#     city = StringField("City", validators=[DataRequired()])
#     state = StringField("State", validators=[DataRequired()])
#     seller = BooleanField("Seller")
#     login = SubmitField() #???


#     email = StringField("Email",validators=[DataRequired()])
#     password = StringField("Password", validators=[DataRequired()])


from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Member

def member_exists(form, field):
    # Checking if member exists
    email = field.data
    member = Member.query.filter(Member.email == email).first()
    if not member:
        raise ValidationError('Email provided not found.')

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    member = Member.query.filter(Member.email == email).first()
    if not member:
        raise ValidationError('No such user exists.')
    if not member.check_password(password):
        raise ValidationError('Password was incorrect.')

class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), member_exists])
    password = StringField("Password", validators=[DataRequired(), password_matches])
    # submit = SubmitField('Login')
