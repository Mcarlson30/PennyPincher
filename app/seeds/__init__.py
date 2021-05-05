from flask.cli import AppGroup
from .users import seed_users, undo_users
from .bills import seed_bills, undo_bills
from .categories import seed_categories, undo_categories
from .transactions import seed_transactions, undo_transactions
from .sub_categories import seed_sub_categories, undo_sub_categories

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_bills()
    seed_sub_categories()
    seed_transactions()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_bills()
    undo_transactions()
    undo_sub_categories()
    # Add other undo functions here
