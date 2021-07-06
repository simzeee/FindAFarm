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

    amenity = Amenity(
        farmId=farmId,
        goatYoga=newAmenities["goatYoga"],
        tableMaking=newAmenities["tableMaking"],
        pigRoast=newAmenities["pigRoast"]
    )

    db.session.add(amenity)
    db.session.commit()

    newFarm.amenityId = amenity.id
    
    db.session.commit()

    return {"amenity": amenity.to_dict()}