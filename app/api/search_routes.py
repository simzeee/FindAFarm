from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Amenity, Farm

search_routes = Blueprint("search", __name__)


# @search_routes.route("/")
# def searchAmenities():

#     searchedAmenity = request.json

#     print("searched amenities", searchedAmenity)