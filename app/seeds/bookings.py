from app.models import db, Booking


def seed_bookings():

    booking1 = Booking(userId=1, cost_of_stay=300, start_day="07/01/2021", end_day="07/03/2021", farmId=1)

    db.session.add(booking1)
    db.session.commit


def undo_bookings():

    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()