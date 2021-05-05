from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction


transaction_routes = Blueprint('transactions', __name__)


# Route for getting all user transactions
@transaction_routes.route("/")
@login_required
def get_transactions():
    transactions = Transaction.query.filter(
        Transaction.user_id == current_user.id)
    return {'transactions': [transaction.to_dict() for transaction in transactions]}


# Route for patching a Transaction
@transaction_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_transaction(transactionId):
    form = TransactionForm()
    edited_transaction = Transaction.query.get(transactionId)
    edited_transaction.amount = form.amount.data
    dited_transaction.description = form.description.data
    dited_transaction.category_id = form.category_id.data
    dited_transaction.receipt_url = form.receipt_url.data
    db.session.commit()
    return


# Route for deleting a transaction
@transaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    db.session.delete(transaction)
    db.session.commit()
    return redirect('/')
