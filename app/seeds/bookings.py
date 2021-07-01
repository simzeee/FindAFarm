from app.models import db, Booking


def seed_bookings():

    booking1 = Booking(userId=1, cost_of_stay=300, start_day="2021-07-01", number_of_guests=2, end_day="2021-07-03", farmId=1, name_of_farm="Schrute Farms")
    booking2 = Booking(userId=1, cost_of_stay=200, start_day="2021-08-01", number_of_guests=2, end_day="2021-08-03", farmId=2, name_of_farm="Dairy Farm")

    db.session.add(booking1)
    db.session.add(booking2)
    db.session.commit()


def undo_bookings():

    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()