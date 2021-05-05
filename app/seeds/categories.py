# from werkzeug.security import generate_password_hash
from app.models import db, Category


# Adds a demo user bills, you can add other bills here if you want
def seed_categories():

    categories = Category(category='Entertainment')

    db.session.add(categories)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_categories():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
