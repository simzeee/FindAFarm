from flask.cli import AppGroup
from .users import seed_users, undo_users
from .farms import seed_farms, undo_farms
from .bookings import seed_bookings, undo_bookings
from .images import seed_images, undo_images
from .amenities import seed_amenity, undo_amenity

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_amenity()
    seed_farms()
    seed_bookings()
    seed_images()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_farms()
    undo_bookings()
    undo_images()
    undo_amenity()
    undo_users()
    # Add other undo functions here
