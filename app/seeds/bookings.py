from app.models import db, Booking


def seed_bookings():

    booking1 = Booking(userId=1, costOfStay=300, startDate="2021-07-01", numberOfGuests=2, endDate="2021-07-03", farmId=1, nameOfFarm="Schrute Farms")
    booking2 = Booking(userId=1, costOfStay=200, startDate="2021-08-01", numberOfGuests=2, endDate="2021-08-03", farmId=2, nameOfFarm="Dairy Farm")

    db.session.add(booking1)
    db.session.add(booking2)
    db.session.commit()


def undo_bookings():

    db.session.execute("TRUNCATE bookings RESTART IDENTITY CASCADE;")
    db.session.commit()