# from flask_wtf import FlaskForm
# from wtforms import StringField,TextAreaField,DecimalField,SelectField,IntegerField
# from wtforms.validators import DataRequired

# class ProductForm(FlaskForm):
#     name=StringField("Product Name",validators=[DataRequired()])
#     description=TextAreaField("Description",validators=[DataRequired()])
#     price=DecimalField("Price",validators=[DataRequired()])
#     category=SelectField("Category",validators=[DataRequired()])
#     available = IntegerField("Stock Quantity",validators=[DataRequired()])

# # origin city and state comes from the seller

from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, FileField
from wtforms.validators import DataRequired, NumberRange, Length

class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(max=30)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=500)])
    price = DecimalField("Price", validators=[DataRequired(), NumberRange(min=0)], places=2)
    category = SelectField("Category", validators=[DataRequired()], choices=[('Fresh', 'Fresh'), ('Bloomy Rind', 'Bloomy Rind'), ('Wash Rind', 'Wash Rind'), ])  # Populate choices
    available = IntegerField("Stock Quantity", validators=[DataRequired(), NumberRange(min=0)])
