from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError


class TransactionForm(FlaskForm):
    # url StringFieldd andcaption
    amount = FloatField('amount', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    category_id = IntegerField('integer', validators=[DataRequired()])
    sub_category = StringField('sub_category', validators=[DataRequired()])
    receipt_url = StringField('receipt_url')
