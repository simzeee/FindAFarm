from app.api.amenity_routes import amenities
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Farm, Image, Amenity


farm_routes = Blueprint("farms", __name__)


@farm_routes.route("/")
def farms():
    farms = Farm.query.all()
    return {"farms": [farm.to_dict() for farm in farms]}


@farm_routes.route("/<int:id>")
def farm(id):
    farm = Farm.query.get(id)
    return farm.to_dict()


@farm_routes.route('/', methods=["POST"])
@login_required
def createFarm():

    newFarm = request.json

    imageFarmName = newFarm["farmName"]

    farmImages = Image.query.filter(Image.farmName == imageFarmName).first()

    farm = Farm(
        name=newFarm["farmName"],
        pricePerDay=newFarm["pricePerDay"],
        primaryImage=farmImages.primaryImage,
        secondImage=farmImages.secondImage,
        thirdImage=farmImages.thirdImage,
        fourthImage=farmImages.fourthImage,
        fifthImage=farmImages.fifthImage,
        location=newFarm["location"],
        description=newFarm["description"],
        userId=current_user.id
    )
    db.session.add(farm)
    db.session.commit()

    farmImages.farmId = farm.id
    db.session.commit()

    array = newFarm["stateAmenities"].items()
    trueValues = []

    for key, value in array:
        if value is True:
            trueValues.append(key)

    amenities = Amenity.query.filter(Amenity.amenityName.in_(trueValues)).all()
    farm.amenities.extend(amenities)

    # This is in the database after commit

    db.session.commit()

    return {"farm": farm.to_dict()}


@farm_routes.route('/', methods=["PUT"])
@login_required
def editFarm():

    editedFarm = request.json

    imageFarmId = editedFarm["farmId"]

    farmImages = Image.query.filter(Image.farmId == imageFarmId).first()

    farmToEdit = Farm.query.get(imageFarmId)

    print("FARM TO EDIT", farmToEdit)
    print("FAR IMAGES", farmImages)
    print(imageFarmId)
    print(editedFarm)

    farmToEdit.name = editedFarm["farmName"]
    farmToEdit.pricePerDay = editedFarm["pricePerDay"]
    farmToEdit.primaryImage = farmImages.primaryImage
    farmToEdit.secondImage = farmImages.secondImage
    farmToEdit.thirdImage = farmImages.thirdImage
    farmToEdit.fourthImage = farmImages.fourthImage
    farmToEdit.fifthImage = farmImages.fifthImage
    farmToEdit.location = editedFarm["location"]
    farmToEdit.description = editedFarm["description"]
    farmToEdit.userId = current_user.id

    db.session.commit()

    return {"farm": farmToEdit.to_dict()}


@farm_routes.route('/amenities/', methods=["PATCH"])
@login_required
def editFarmAmenities():

    editedFarm = request.json

    farmId = editedFarm["farmId"]

    farmToEdit = Farm.query.get(farmId)

    print("FARM TO EDIT", farmToEdit)

    array = editedFarm["stateAmenities"].items()
    trueValues = []

    for key, value in array:
        if value is True:
            trueValues.append(key)

    print("TRUE VALUES", trueValues)

    amenities = Amenity.query.filter(Amenity.amenityName.in_(trueValues)).all()
    # farmToEdit.amenities.extend(amenities)

    for a in amenities:
        print("HERE IS PRINT", a.amenityName)

    i = len(farmToEdit.amenities)-1

    while i >= 0:
        farmToEdit.amenities.pop(i)
        i -= 1

    for a in amenities:
        farmToEdit.amenities.append(a)

    db.session.commit()
    return {"farm": farmToEdit.to_dict()}


@farm_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteFarm(id):
    print("ID HERE", id)

    farmToDelete = Farm.query.get(id)
    imageToDelete = Image.query.filter(Image.farmId == id).first()
    # amenityToDelete = Amenity.query.filter(Amenity.farmId == id).first()

    db.session.delete(farmToDelete)
    db.session.delete(imageToDelete)
    # db.session.delete(amenityToDelete)
    db.session.commit()
    return {"id": id}
