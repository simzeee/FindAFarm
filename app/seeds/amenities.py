from app.models import db, Amenity


def seed_amenity():

    dwight = Amenity(goatYoga=False, pigRoast=False, tableMaking=True, farmId=1)
    dairy = Amenity(goatYoga=True, pigRoast=False, tableMaking=False, farmId=2)
    sacred = Amenity(goatYoga=False, pigRoast=True, tableMaking=False, farmId=3)

    db.session.add(dwight)
    db.session.add(dairy)
    db.session.add(sacred)    
    db.session.commit()


def undo_amenity():

    db.session.execute("TRUNCATE amenities RESTART IDENTITY CASCADE;")
    db.session.commit()
