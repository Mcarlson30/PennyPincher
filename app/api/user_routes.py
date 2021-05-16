from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db
from app.forms.user_form import UserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# Route for patching a users income
@user_routes.route('/', methods=['PATCH'])
@login_required
def patch_user():
    form = UserForm()  # Maybe another form!!!
    edited_user = User.query.get(current_user.id)
    print('inside user route-----------', edited_user)
    edited_user.income = form.income.data
    db.session.commit()
    return edited_user.to_dict()
