from .db import db
import datetime
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Bill(db.Model):
    __tablename__ = 'bills'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        "categories.id"), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # db relationships
    user = db.relationship('User', back_populates='user_bills')
    category = db.relationship('Category', back_populates='bills')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "category_id": self.category_id,
            "amount": self.amount,
            "due_date": self.due_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
