from flask_wtf import FlaskForm
from wtforms import StringField,TextAreaField,DecimalField,SelectField,IntegerField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    name=StringField("Product Name",validators=[DataRequired()])
    description=TextAreaField("Description",validators=[DataRequired()])
    price=DecimalField("Price",validators=[DataRequired()])
    category=SelectField("Category",validators=[DataRequired()])
    available = IntegerField("Stock Quantity",validators=[DataRequired()])

# origin city and state comes from the seller
