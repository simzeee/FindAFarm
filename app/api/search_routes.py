from app.api.amenity_routes import amenities
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Amenity, Farm

search_routes = Blueprint("search", __name__)


@search_routes.route("/", methods=["POST"])
def searchAmenities():

    searchedAmenity = request.json

    print("search", searchedAmenity)

    trueList = []

    for key, value in searchedAmenity.items():
        if value is True:
            trueList.append(key)

    print("trueList", trueList)
    amenities = Amenity.query.filter(Amenity.amenityName.in_(trueList)).all()
    
    farms = []

    [farms.extend(a.farms) for a in amenities]

    results = list(set(farms))

    print("RESULTS", results)

    return {"results": [result.to_dict() for result in results]}

    # for amenity in trueList:
    #     type(amenity)
    #     foundAmenity = Amenity.query.filter(Amenity.str(amenity) is True).all()
    #     print("FOUND FOUND FOUND", foundAmenity)


    # allAmenities = Amenity.query.all()

    # print("All amenities", allAmenities)

    # goatList = []
    # tableList = []
    # pigRoastList = [] 

    # for amenity in allAmenities:
    #     if amenity.goatYoga is True:
    #         goatList.append(amenity.farmId)
    #     elif amenity.tableMaking is True:
    #         tableList.append(amenity.farmId)
    #     elif amenity.pigRoast is True:
    #         pigRoastList.append(amenity.farmId)

    # print("goatList", goatList)
    # print("tableList", tableList)
    # print("pigRoastList", pigRoastList)
    # print("True List", trueList)

    

    
    # print("searched amenities", trueList)

    # amenitylist = []

        # amenitylist.append(foundAmenity)

    
