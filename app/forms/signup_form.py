# from flask_wtf import FlaskForm
# from wtforms import StringField,BooleanField, SubmitField
# from wtforms.validators import DataRequired


# #member?
# # def user_exists(form, field):
# #     # Checking if user exists
# #     email = field.data
# #     user = User.query.filter(User.email == email).first()
# #     if user:
# #         raise ValidationError('Email address is already in use.')

# def member_exists(form, field):
#     #Checking if member exists
#     email = field.data
#     member = Member.query.filter(Member.email == email).first()
#     if member:
#         raise ValidationErro('Email address is already in use.')

# #member?
# # def username_exists(form, field):
# #     # Checking if username is already in use
# #     username = field.data
# #     user = User.query.filter(User.username == username).first()
# #     if user:
# #         raise ValidationError('Username is already in use.')

# def email_exists(form, field):
#     #Checking if email is already in use
#     email = field.data
#     member = Member.query.filter(Member.email == email).first()
#     if email:
#         raise ValidationError('Username is already in use.')

# class SignupForm(FlaskForm):
#     first_name = StringField("First Name",validators=[DataRequired()])
#     last_name = StringField("Last Name", validators=[DataRequired()])
#     email = StringField("Email", validators=[DataRequired()])
#     password = StringField("Password", validators=[DataRequired()])
#     address = StringField("Address", validators=[DataRequired()])
#     city = StringField("City", validators=[DataRequired()])
#     state = StringField("State", validators=[DataRequired()])
#     seller = BooleanField("Seller")
#     login = SubmitField() #???


# #do we even need this form?!



from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Member

def member_exists(form, field):
    # Checking if member exists
    email = field.data
    member = Member.query.filter(Member.email == email).first()
    if member:
        raise ValidationError('Email address is already in use.')

class SignUpForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired(), member_exists])
    password = StringField("Password", validators=[DataRequired()])
    address = StringField("Address", validators=[DataRequired()])
    city = StringField("City", validators=[DataRequired()])
    state = StringField("State", validators=[DataRequired()])
    seller = BooleanField("Seller")
    submit = SubmitField('Sign Up')
