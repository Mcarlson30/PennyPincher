from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Budget

budget_routes = Blueprint('budgets', __name__)


# Route for getting all users budgets
@budget_routes.route("/")
@login_required
def get_budgets():
    budgets = Budget.query.filter(
        Budget.user_id == current_user.id)
    return {'budgets': [budget.to_dict() for budget in budgets]}


# Route for patching a Budget
@budget_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def patch_budget(budgetId):
    form = BudgetForm()
    edited_budget = Budget.query.get(budgetId)
    edited_budget.amount = form.amount.data
    edited_budget.name = form.name.data
    edited_budget.category_id = form.category_id.data
    edited_budget.due_date = form.due_date.data
    db.session.commit()
    return


# Route for deleting a budget
@budget_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_budget(id):
    budget = Budget.query.get(id)
    db.session.delete(budget)
    db.session.commit()
    return redirect('/')
