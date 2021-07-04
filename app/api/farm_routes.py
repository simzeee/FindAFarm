from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import booking, db, Farm, Image


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
 
    print("NEW FARM NEW FARM", newFarm)

    farmImages = Image.query.filter(Image.farmName == imageFarmName).first()

    print("FARM IMAGES", farmImages.primaryImage)

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
    return {"farm": farm.to_dict()}