from .db import db
import datetime
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    receipt_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # db relationships
    user = db.relationship('User', back_populates='user_transactions')
    category = db.relationship('Category', back_populates='transaction')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "description": self.description,
            "category": category.to_dict(),
            "amount": self.amount,
            "receipt_url": self.receipt_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
