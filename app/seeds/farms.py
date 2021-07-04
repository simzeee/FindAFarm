from app.models import db, Farm


def seed_farms():

    farm1 = Farm(name="Schrute Farms", pricePerDay=150, location="Scranton", primaryImage="https://findafarmbucket.s3.amazonaws.com/b01504419f7d4355995d23d739ec0a96.jpeg", userId=2, description="Bears. Beets. Battlestar Galactica.")
    
    farm2 = Farm(name="Dairy Farm", pricePerDay=100, location="Skokie", primaryImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", userId=3, description="Enjoy a glass of milk. Have a slice of cheese.")
    
    farm3 = Farm(name="Sacred Groves", pricePerDay=200, location="Seguine, Texas", primaryImage="https://findafarmbucket.s3.amazonaws.com/31d6fbd423774e13a544657d76f4c6d1.png", secondImage="https://findafarmbucket.s3.amazonaws.com/597b557c9ae24363b4d8c9a8a06fefc2.png", thirdImage='https://findafarmbucket.s3.amazonaws.com/513d9607a79341af8dc253b8b15f5ec9.png',
    fourthImage='https://findafarmbucket.s3.amazonaws.com/2baa045826544c88b7e7853661623f7b.png', fifthImage="https://findafarmbucket.s3.amazonaws.com/704c9906d7944722b5195a5181fe2002.png", userId=4, description="A quaint and cosey farm full of charm and adventure.")

    db.session.add(farm1)
    db.session.add(farm2)
    db.session.add(farm3)

    db.session.commit()


def undo_farms():
    db.session.execute("TRUNCATE farms RESTART IDENTITY CASCADE;")
    db.session.commit()