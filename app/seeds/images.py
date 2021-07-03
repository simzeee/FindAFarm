from app.models import db, Image


def seed_images():

    schruteFarms = Image(user=2, primaryImage="https://findafarmbucket.s3.amazonaws.com/b01504419f7d4355995d23d739ec0a96.jpeg")
    dairyFarm = Image(user=3, primaryImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg")

    db.session.add(schruteFarms)
    db.session.add(dairyFarm)
    db.session.commit()


def undo_images():

    db.session.execute("TRUNCATE images RESTART IDENTITY CASCADE;")
    db.session.commit()