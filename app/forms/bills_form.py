from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError


class BillForm(FlaskForm):
    # url StringFieldd andcaption
    amount = FloatField('amount', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category_id = IntegerField('integer', validators=[DataRequired()])
    sub_category = StringField('sub_category', validators=[DataRequired()])
    due_date = DateField('due_date', validators=[DataRequired()])
