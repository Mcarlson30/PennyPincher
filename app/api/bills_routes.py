from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Bill
from app.forms.bills_form import BillForm

bills_routes = Blueprint('bills', __name__)


# Route for getting all users bills
@bills_routes.route("/")
# @login_required
def get_bills():
    bills = Bill.query.filter(
        Bill.user_id == current_user.id)
    return {'bills': [bill.to_dict() for bill in bills]}


# Route for patching a Bill
@bills_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_bill(billId):
    form = BillForm()
    edited_bill = Bill.query.get(billId)
    edited_bill.amount = form.amount.data
    edited_bill.name = form.name.data
    edited_bill.category_id = form.category_id.data
    edited_bill.due_date = form.due_date.data
    db.session.commit()
    return


# Route for deleting a bill
@bills_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_bill(id):
    bill = Bill.query.get(id)
    db.session.delete(bill)
    db.session.commit()
    bills = Bill.query.filter(
        Bill.user_id == current_user.id)
    return {'bills': [bill.to_dict() for bill in bills]}


@bills_routes.route('/', methods=['POST'])
@login_required
def post_bill():
    form = BillForm()
    newBill = Bill(
        user_id=current_user.id,
        amount=form.amount.data,
        name=form.description.data,
        category_id=form.category_id.data,
        sub_category=form.sub_category.data,
        due_date=form.due_date.data
    )
    print('Bill---------------', newBill)
    db.session.add(newBill)
    db.session.commit()
    bills = Bill.query.filter(
        Bill.user_id == current_user.id)
    return {'bills': [bill.to_dict() for bill in bills]}
