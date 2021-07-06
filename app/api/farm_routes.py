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
 
    # print("NEW FARM NEW FARM", newFarm)

    farmImages = Image.query.filter(Image.farmName == imageFarmName).first()

    # print("FARM IMAGES", farmImages.primaryImage)

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
    return {"farm": farm.to_dict()}

@farm_routes.route('/', methods=["PUT"])
@login_required
def editFarm():

    editedFarm = request.json

    print("EDITED INFORATION", editedFarm)

    imageFarmId = editedFarm["farmId"]

    farmImages = Image.query.filter(Image.farmId == imageFarmId).first()

    farmToEdit = Farm.query.get(imageFarmId)

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

    amenityToEdit = Amenity.query.get(editedFarm["amenityId"])

    amenityToEdit.goatYoga = editedFarm["goatYoga"]
    amenityToEdit.tableMaking = editedFarm["tableMaking"]
    amenityToEdit.pigRoast = editedFarm["pigRoast"]

    db.session.commit()

    return {"farm": farmToEdit.to_dict()}


@farm_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def deleteFarm(id):
    print("ID HERE", id)

    farmToDelete = Farm.query.get(id)
    imageToDelete = Image.query.filter(Image.farmId == id).first()
    amenityToDelete = Amenity.query.filter(Amenity.farmId == id).first()

    db.session.delete(farmToDelete)
    db.session.delete(imageToDelete)
    db.session.delete(amenityToDelete)
    db.session.commit()
    return {"id": id}

