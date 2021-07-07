from app.models import db, Amenity


def seed_amenity():
    a1 = Amenity(amenityName='Goat Yoga')
    a2 = Amenity(amenityName='Table Making')
    a3 = Amenity(amenityName='Pig Roast')

    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)    
    db.session.commit()


def undo_amenity():

    db.session.execute("TRUNCATE amenities RESTART IDENTITY CASCADE;")
    db.session.commit()
