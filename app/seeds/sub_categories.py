# from werkzeug.security import generate_password_hash
from app.models import db, SubCategory
from alembic import op

# Seed sub categories


def seed_sub_categories():

    cat1 = SubCategory(category_id=2, sub_category='Mortgage/Rent')
    cat2 = SubCategory(category_id=2, sub_category='Household repairs')
    cat3 = SubCategory(category_id=2, sub_category='Property Taxes')
    cat4 = SubCategory(category_id=2, sub_category='Large Appliances')
    cat5 = SubCategory(category_id=3, sub_category='Toll payments')
    cat6 = SubCategory(
        category_id=3, sub_category='Public transportation fare')
    cat7 = SubCategory(category_id=3, sub_category='Gas')
    cat8 = SubCategory(category_id=3, sub_category='Car maintenance')
    cat9 = SubCategory(category_id=3, sub_category='Registration/DMV Fees')
    cat10 = SubCategory(category_id=4, sub_category='Groceries')
    cat11 = SubCategory(category_id=4, sub_category='Dining Out')
    cat12 = SubCategory(category_id=4, sub_category='Pet Food')
    cat13 = SubCategory(category_id=5, sub_category='Water')
    cat14 = SubCategory(category_id=5, sub_category='Electricity')
    cat15 = SubCategory(category_id=5, sub_category='Gas')
    cat16 = SubCategory(category_id=5, sub_category='Trash')
    cat17 = SubCategory(category_id=5, sub_category='Television')
    cat18 = SubCategory(category_id=5, sub_category='Cell Phone')
    cat19 = SubCategory(category_id=5, sub_category='Internet')
    cat20 = SubCategory(category_id=6, sub_category='Medication')
    cat21 = SubCategory(category_id=6, sub_category='Doctor\'s Visits')
    cat22 = SubCategory(category_id=6, sub_category='Senior Care')
    cat23 = SubCategory(category_id=7, sub_category='Sudent Loan')
    cat24 = SubCategory(category_id=7, sub_category='Credit Card')
    cat25 = SubCategory(category_id=7, sub_category='Car Payment')
    cat26 = SubCategory(category_id=8, sub_category='Supplies')
    cat27 = SubCategory(category_id=8, sub_category='Small Appliances')
    cat28 = SubCategory(category_id=9, sub_category='Toiletries')
    cat29 = SubCategory(category_id=9, sub_category='Gym Membership')
    cat30 = SubCategory(category_id=9, sub_category='Clothing')
    cat31 = SubCategory(category_id=11, sub_category='Tuition')
    cat32 = SubCategory(category_id=11, sub_category='Registration Fees')
    cat33 = SubCategory(category_id=11, sub_category='School Supplies')
    cat34 = SubCategory(category_id=11, sub_category='Daycare')
    cat35 = SubCategory(category_id=10, sub_category='Car Insurance')
    cat36 = SubCategory(
        category_id=10, sub_category='Homeowners/Renters Insurance')
    cat37 = SubCategory(category_id=10, sub_category='Life Insurance')
    cat38 = SubCategory(category_id=10, sub_category='Dental Insurance')
    cat39 = SubCategory(category_id=10, sub_category='Health Insurance')
    cat40 = SubCategory(category_id=12, sub_category='Birthday Gift')
    cat41 = SubCategory(category_id=12, sub_category='Anniversary Gift')
    cat42 = SubCategory(category_id=12, sub_category='Holiday Gift')
    cat43 = SubCategory(category_id=13, sub_category='Savings')
    cat44 = SubCategory(category_id=13, sub_category='Retirement')
    cat45 = SubCategory(category_id=13, sub_category='Vacation fund')
    cat46 = SubCategory(category_id=14, sub_category='Other')
    cat47 = SubCategory(category_id=1, sub_category='Subscriptions')
    cat48 = SubCategory(category_id=1, sub_category='Electronics')
    cat49 = SubCategory(category_id=1, sub_category='Games')
    cat50 = SubCategory(category_id=1, sub_category='Outings')

    db.session.add_all([cat1, cat2, cat3, cat4, cat5, cat6, cat7,
                       cat8, cat9, cat10, cat11, cat12, cat13, cat14, cat15, cat16, cat17, cat18, cat19, cat20, cat21, cat22, cat23, cat24, cat25, cat26, cat27, cat28, cat29, cat30, cat31, cat32, cat33, cat34, cat35, cat36, cat37, cat38, cat39, cat40, cat41, cat42, cat43, cat44, cat45, cat46, cat47, cat48, cat49, cat50])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_sub_categories():
    db.session.execute('TRUNCATE sub_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
