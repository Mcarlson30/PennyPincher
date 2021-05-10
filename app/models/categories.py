from .db import db
import datetime
# from werkzeug.security import generate_password_hash, check_password_hash
# from flask_login import UserMixin


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # db relationships
    transaction = db.relationship('Transaction', back_populates='category')
    bills = db.relationship('Bill', back_populates='category')
    budgets = db.relationship('Budget', back_populates='category')
    sub_categories = db.relationship(
        'SubCategory', back_populates='categories')

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "sub_categories": [sub_categories.to_dict() for sub_categories in self.sub_categories]
            # "created_at": self.created_at,
            # "updated_at": self.updated_at
        }
