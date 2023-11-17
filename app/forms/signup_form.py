from flask_wtf import FlaskForm
from wtforms import StringField,BooleanField, SubmitField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    email = StringField("Email",validators=[DataRequired()])
    password = StringField("Password", validators=[DataRequired()])


#do we even need this form?!

