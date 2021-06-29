from app.models import db, Farm


def seed_farms():

    farm1 = Farm(name="Schrute Farms", price_per_day=150, image="imagestring", location="Scranton", userId=2)

    db.session.add(farm1)

    db.session.commit()


def undo_farms():
    db.session.execute("TRUNCATE users RESTART IDENTITY CASCADE;")
    db.session.commit()