from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, ValidationError


class UserForm(FlaskForm):
    income = FloatField('income', validators=[DataRequired()])
