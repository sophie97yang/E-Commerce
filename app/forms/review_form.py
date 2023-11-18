from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField, FileField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileAllowed, FileRequired
from wtforms.fields.html5 import DateField

class ReviewForm(FlaskForm):
    rating = SelectField('Rating', choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], validators=[DataRequired()])
    headline = StringField('Headline', validators=[DataRequired(), Length(max=255)])
    content = TextAreaField('Content', validators=[DataRequired(), Length(max=1000)])
    review_date = DateField('Review Date', validators=[DataRequired()])
    images = FileField('Upload Images', validators=[
        FileAllowed(['jpg', 'png'], 'Images'),
    ])
    submit = SubmitField('Submit Review')
