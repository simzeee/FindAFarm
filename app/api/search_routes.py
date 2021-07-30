from app.api.amenity_routes import amenities
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Amenity, Farm

search_routes = Blueprint("search", __name__)


@search_routes.route("/", methods=["POST"])
def searchAmenities():

    searchedAmenity = request.json

    trueList = []

    for key, value in searchedAmenity.items():
        if value is True:
            trueList.append(key)

    amenities = Amenity.query.filter(Amenity.amenityName.in_(trueList)).all()
    
    farms = []

    [farms.extend(a.farms) for a in amenities]

    results = list(set(farms))

    return {"results": [result.to_dict() for result in results]}