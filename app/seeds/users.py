from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want


def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', farmer=False)
    dwight = User(username='Dwight Schrute', email='beets@gmail.com', password='password', farmer=True)
    demoFarmer = User(username='Farmer Bill', email='demo@gmail.com', password='password', farmer=True)
    farmerPaul = User(username='Farmer Paul', email='sacred@gmail.com', password='password', farmer=True)

    db.session.add(demo)
    db.session.add(dwight)
    db.session.add(demoFarmer)
    db.session.add(farmerPaul)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
