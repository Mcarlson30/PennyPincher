# from werkzeug.security import generate_password_hash
from app.models import db, Transaction
from datetime import datetime


# Adds a demo user bills, you can add other bills here if you want
def seed_transactions():

    transactions = Transaction(user_id=1, amount='13.99',
                               description='Hulu', category_id=1, receipt_url='www.google.com')

    db.session.add(transactions)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_transactions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
