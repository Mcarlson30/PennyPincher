# from werkzeug.security import generate_password_hash
from app.models import db, Category
from alembic import op


def seed_categories():

    cat1 = Category(category='Entertainment')
    cat2 = Category(category='Housing')
    cat3 = Category(category='Transportation')
    cat4 = Category(category='Food')
    cat5 = Category(category='Utilities')
    cat7 = Category(category='Health Care')
    cat8 = Category(category='Debt')
    cat9 = Category(category='Household Items')
    cat10 = Category(category='Personal Care')
    cat11 = Category(category='Insurance')
    cat12 = Category(category='Education/Childcare')
    cat13 = Category(category='Gifts')
    cat14 = Category(category='Savings')
    cat15 = Category(category='Miscellaneous')

    db.session.add_all([cat1, cat2, cat3, cat4, cat5, cat7,
                       cat8, cat9, cat10, cat11, cat12, cat13, cat14, cat15])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
