from app.models import db, Farm


def seed_farms():

    farm1 = Farm(name="Schrute Farms", pricePerDay=150, location="Scranton", image="https://findafarmbucket.s3.amazonaws.com/b01504419f7d4355995d23d739ec0a96.jpeg", userId=2)
    farm2 = Farm(name="Dairy Farm", pricePerDay=100, location="Skokie", image="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", userId=3)

    db.session.add(farm1)
    db.session.add(farm2)

    db.session.commit()


def undo_farms():
    db.session.execute("TRUNCATE farms RESTART IDENTITY CASCADE;")
    db.session.commit()