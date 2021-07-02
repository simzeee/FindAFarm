from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import booking, db, Farm


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
 
    print("NEW FARM NEW FARM", newFarm)

    farm = Farm(
        name=newFarm["farmName"],
        pricePerDay=newFarm["pricePerDay"],
        location=newFarm["location"],
        userId=current_user.id
    )

    db.session.add(farm)
    db.session.commit()
    return {"farm": farm.to_dict()}