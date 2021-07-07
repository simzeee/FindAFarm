from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Amenity, Farm


amenity_routes = Blueprint("amenities", __name__)


@amenity_routes.route("/")
def getAmenities():
    amenities = Amenity.query.all()
    return {"amenities": [amenity.to_dict() for amenity in amenities]}


@amenity_routes.route("/", methods=["POST"])
@login_required
def amenities():

    newAmenities = request.json
    print("NEW AMENITIES", newAmenities)
    farmName = newAmenities["farmName"]
    print("FARM NAME", farmName)
    newFarm = Farm.query.filter(Farm.name == farmName).first()
    print("DID WE FIND A FARM", newFarm)

    farmId = newFarm.id
    print("THE ID", farmId)

    trueList = []
    for key, value in newAmenities.items():
        if value is True:
            trueList.append(key)
        
    farm = Farm.query.get(farmId)

    amenities = Amenity.query.filter(Amenity.amenityName.in_(trueList)).all()

    for a in farm.amenities:
        farm.amenities.remove(a)

    for a in amenities:
        farm.amenities.append(a)  #amenities comes from backref

    db.session.commit()
    print("WHAT WE ARE SENDING", farm.to_dict())
    print("AMENITIES", farm["farmAmenities"])

    return farm.to_dict()