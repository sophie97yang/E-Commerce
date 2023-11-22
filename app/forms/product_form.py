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
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, FileField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(max=30)])
    description = TextAreaField("Description", validators=[DataRequired(), Length(max=500)])
    price = DecimalField("Price", validators=[DataRequired(), NumberRange(min=0)], places=2)
    category = SelectField("Category", validators=[DataRequired()], choices=[('Fresh', 'Fresh'), ('Bloomy Rind', 'Bloomy Rind'), ('Wash Rind', 'Wash Rind'), ])  # Populate choices #this should be dynammic
    available = IntegerField("Stock Quantity", validators=[DataRequired(), NumberRange(min=0)])
    preview_image = FileField("Product Image Preview", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    product_image1 = FileField("Product Image 1", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    product_image2 = FileField("Product Image 2", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    product_image3 = FileField("Product Image 3", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    product_image4 = FileField("Product Image 4", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Submit Review')
