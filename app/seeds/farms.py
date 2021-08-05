from app.models import db, Farm, Amenity


def seed_farms():

    allAmenities = Amenity.query.all()

    farm1 = Farm(name="Schrute Farms", pricePerDay=150,
     location="lat: 41.4090 lng: -75.6624", primaryImage="https://findafarmbucket.s3.amazonaws.com/b01504419f7d4355995d23d739ec0a96.jpeg", secondImage="https://findafarmbucket.s3.amazonaws.com/d40df76b63414e1089cb0b1b4c9f78e2.jpg", thirdImage='https://findafarmbucket.s3.amazonaws.com/8215c0aa520146df9e029436dae55496.jpg',
    fourthImage='https://findafarmbucket.s3.amazonaws.com/477a2c6b427c420faf958ca85b24ae3a.jpg', fifthImage="https://findafarmbucket.s3.amazonaws.com/8a3dc037448543ea8c91c95fa67b8673.png",
     userId=2, description="Bears. Beets. Battlestar Galactica.")
    
    farm2 = Farm(name="Dairy Farm", pricePerDay=100, location="lat: 43.7911 lng: -88.9559", primaryImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", secondImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", thirdImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg",
    fourthImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", fifthImage="https://findafarmbucket.s3.amazonaws.com/64c06fb946904498b2d88bec6393b979.jpeg", userId=3, description="Enjoy a glass of milk. Have a slice of cheese.")
    
    farm3 = Farm(name="Sacred Groves", pricePerDay=200, location="lat: 29.5688 lng: -97.9467", primaryImage="https://findafarmbucket.s3.amazonaws.com/31d6fbd423774e13a544657d76f4c6d1.png", secondImage="https://findafarmbucket.s3.amazonaws.com/597b557c9ae24363b4d8c9a8a06fefc2.png", thirdImage='https://findafarmbucket.s3.amazonaws.com/513d9607a79341af8dc253b8b15f5ec9.png',
    fourthImage='https://findafarmbucket.s3.amazonaws.com/2baa045826544c88b7e7853661623f7b.png', fifthImage="https://findafarmbucket.s3.amazonaws.com/704c9906d7944722b5195a5181fe2002.png", userId=4, description="A quaint and cosey farm full of charm and adventure.")

    farm4 = Farm(name="Austen's Farm", pricePerDay=150, location="lat: 34.8974730887944 lng: -111.75248789062499", primaryImage="https://findafarmbucket.s3.amazonaws.com/904ad9458bc1425d880764bd816a9990.png", secondImage="https://findafarmbucket.s3.amazonaws.com/904ad9458bc1425d880764bd816a9990.png", thirdImage="https://findafarmbucket.s3.amazonaws.com/904ad9458bc1425d880764bd816a9990.png",
    fourthImage="https://findafarmbucket.s3.amazonaws.com/904ad9458bc1425d880764bd816a9990.png", fifthImage="https://findafarmbucket.s3.amazonaws.com/904ad9458bc1425d880764bd816a9990.png", userId=2, description="Austen is a great guy with a great farm.")
    
    farm5 = Farm(name="Lizzie's Farm", pricePerDay=100, location="lat: 43.7911 lng: -88.9559", primaryImage="https://findafarmbucket.s3.amazonaws.com/7a05a5620a1845cd933fe8d851045657.jpeg", secondImage="https://findafarmbucket.s3.amazonaws.com/7a05a5620a1845cd933fe8d851045657.jpeg", thirdImage="https://findafarmbucket.s3.amazonaws.com/7a05a5620a1845cd933fe8d851045657.jpeg",
     fourthImage="https://findafarmbucket.s3.amazonaws.com/7a05a5620a1845cd933fe8d851045657.jpeg", fifthImage="https://findafarmbucket.s3.amazonaws.com/7a05a5620a1845cd933fe8d851045657.jpeg", userId=2, description="Berry season is the best season.")
    
    farm6 = Farm(name="Northwest Farm", pricePerDay=200, location="lat: 47.837155604135596 lng: -120.38627519531249", primaryImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", secondImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", thirdImage='https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg',
    fourthImage='https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg', fifthImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", userId=2, description="A welcoming host in one of the greatest climates.")

    farm7 = Farm(name="Florida Farm", pricePerDay=200, location="lat: 47.837155604135596 lng: -120.38627519531249", primaryImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", secondImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", thirdImage='https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg',
    fourthImage='https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg', fifthImage="https://findafarmbucket.s3.amazonaws.com/48a35167809d472c95bc2ef63ca7c3d8.jpeg", userId=2, description="A welcoming host in one of the greatest climates.")

    db.session.add(farm1)
    db.session.add(farm2)
    db.session.add(farm3)
    db.session.add(farm4)
    db.session.add(farm5)
    db.session.add(farm6)
    db.session.add(farm7)

    farm1.amenities.append(allAmenities[1])
    farm1.amenities.append(allAmenities[7])
    farm1.amenities.append(allAmenities[6])
    farm2.amenities.append(allAmenities[1])
    farm3.amenities.append(allAmenities[2])
    farm4.amenities.append(allAmenities[3])
    farm5.amenities.append(allAmenities[4])
    farm6.amenities.append(allAmenities[5])
    farm7.amenities.append(allAmenities[6])

    db.session.commit()


def undo_farms():
    db.session.execute("TRUNCATE farms RESTART IDENTITY CASCADE;")
    db.session.commit()