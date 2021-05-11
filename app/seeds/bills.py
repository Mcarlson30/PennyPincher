# from werkzeug.security import generate_password_hash
from app.models import db, Bill
from datetime import datetime

# Adds a demo user bills, you can add other bills here if you want


def seed_bills():

    bills = Bill(user_id=1, amount='13.99',
                 name='Netflix', category_id=1, sub_category='Subscriptions', due_date=datetime.now())

    db.session.add(bills)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_bills():
    db.session.execute('TRUNCATE bills RESTART IDENTITY CASCADE;')
    db.session.commit()
