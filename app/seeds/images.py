from app.models import db, Image


def seed_images():

    schruteFarms = Image(user=2, primaryImage="https://findafarmbucket.s3.amazonaws.com/b01504419f7d4355995d23d739ec0a96.jpeg", farmName="Schrute Farms", farmId=1)
    
    dairyFarm = Image(user=3, primaryImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", farmName="Dairy Farm", farmId=2)
    
    sacredGrove = Image(user=4, primaryImage="https://findafarmbucket.s3.amazonaws.com/31d6fbd423774e13a544657d76f4c6d1.png", secondImage="https://findafarmbucket.s3.amazonaws.com/597b557c9ae24363b4d8c9a8a06fefc2.png", thirdImage='https://findafarmbucket.s3.amazonaws.com/513d9607a79341af8dc253b8b15f5ec9.png',
    fourthImage='https://findafarmbucket.s3.amazonaws.com/2baa045826544c88b7e7853661623f7b.png', fifthImage="https://findafarmbucket.s3.amazonaws.com/704c9906d7944722b5195a5181fe2002.png", farmId=3, farmName="Sacred Groves")

    austensFarm = Image(user=2, primaryImage="https://findafarmbucket.s3.amazonaws.com/904ad9458bc1425d880764bd816a9990.png", farmId=4, farmName="Austen's Farm")

    lizziesFarm = Image(user=2, primaryImage="https://findafarmbucket.s3.amazonaws.com/7a05a5620a1845cd933fe8d851045657.jpeg", farmId=5, farmName="Lizzie's Farm")

    northwestFarm = Image(user=2, primaryImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", farmId=6, farmName="Northwest Farm")

    floridaFarm = Image(user=2, primaryImage="https://findafarmbucket.s3.amazonaws.com/77e5e749e5824d689c4a54d3c4dceb35.png", farmId=7, farmName="Florida Farm")

    db.session.add(schruteFarms)
    db.session.add(dairyFarm)
    db.session.add(sacredGrove)
    db.session.add(austensFarm)
    db.session.add(lizziesFarm)
    db.session.add(northwestFarm)
    db.session.add(floridaFarm)
    db.session.commit()


def undo_images():

    db.session.execute("TRUNCATE images RESTART IDENTITY CASCADE;")
    db.session.commit()