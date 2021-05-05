from .db import db


class SubCategory(db.Model):
    __tablename__ = 'sub_categories'

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey(
        "categories.id"), nullable=False)
    sub_category = db.Column(db.String, nullable=False)

    # db relationships
    categories = db.relationship('Category', back_populates='sub_categories')

    def to_dict(self):
        return {
            # "id": self.id,
            "sub_category": self.sub_category
        }
