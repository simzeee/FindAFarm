from app.models import db, Amenity


def seed_amenity():
    a1 = Amenity(amenityName='Goat Yoga')
    a2 = Amenity(amenityName='Table Making')
    a3 = Amenity(amenityName='Pig Roast')
    a4 = Amenity(amenityName='Cheese Making Class')
    a5 = Amenity(amenityName='Berry Picking')
    a6 = Amenity(amenityName='Homemade Beer')
    a7 = Amenity(amenityName='Candle Making')
    a8 = Amenity(amenityName='Money Beets')

    db.session.add(a1)
    db.session.add(a2)
    db.session.add(a3)
    db.session.add(a4)    
    db.session.add(a5)    
    db.session.add(a6)    
    db.session.add(a7)    
    db.session.add(a8)    
    db.session.commit()


def undo_amenity():

    db.session.execute("TRUNCATE amenities RESTART IDENTITY CASCADE;")
    db.session.commit()
