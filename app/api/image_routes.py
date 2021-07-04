from flask import Blueprint, request
from app.models import db, Image, Farm
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/", methods=["POST"])
@login_required
def upload_image():
    if "primaryImage" not in request.files:
        return {"errors": "image required"}, 400

    print("FILES FILES", request.files)

    image = request.files["primaryImage"]
    secondImage = request.files["secondImage"]
    thirdImage = request.files["thirdImage"]
    fourthImage = request.files["fourthImage"]
    fifthImage = request.files["fifthImage"]
    farmName = request.form["farmName"]

    farmExists = Image.query.filter(Image.farmName == farmName)

    if farmExists:
        print("THAT FARM EXISTS")
    
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400
    
    if not allowed_file(secondImage.filename):
        return {"errors": "file type not permitted"}, 400
    
    if not allowed_file(thirdImage.filename):
        return {"errors": "file type not permitted"}, 400
    
    if not allowed_file(fourthImage.filename):
        return {"errors": "file type not permitted"}, 400
    
    if not allowed_file(fifthImage.filename):
        return {"errors": "file type not permitted"}, 400
    
    image.filename = get_unique_filename(image.filename)
    secondImage.filename = get_unique_filename(secondImage.filename)
    thirdImage.filename = get_unique_filename(thirdImage.filename)
    fourthImage.filename = get_unique_filename(fourthImage.filename)
    fifthImage.filename = get_unique_filename(fifthImage.filename)

    upload = upload_file_to_s3(image)
    upload2 = upload_file_to_s3(secondImage)
    upload3 = upload_file_to_s3(thirdImage)
    upload4 = upload_file_to_s3(fourthImage)
    upload5 = upload_file_to_s3(fifthImage)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400
    if "url" not in upload2:
        return upload2, 400
    if "url" not in upload3:
        return upload2, 400
    if "url" not in upload4:
        return upload2, 400
    if "url" not in upload5:
        return upload2, 400

    urlPrimary = upload["url"]
    urlSecond = upload2["url"]
    urlThird = upload3["url"]
    urlFourth = upload4["url"]
    urlFifth = upload5["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    secondImage=urlSecond, thirdImage=urlThird, fourthImage=urlFourth,
    fifthImage=urlFifth, farmName=farmName)
    # farm = Farm.query.filter(Farm.name == farmName).first()
    
    # print("FARM FOUND", farm)

    #farm that was just created
    # farm.primaryImage = image
    # farm.secondImage = secondImage
    # farm.thirdImage = thirdImage
    # farm.fourthImage = fourthImage
    # farm.fifthImage = fifthImage

    db.session.add(new_image)
    db.session.commit()
    return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird,
    "urlFourth": urlFourth, "urlFifth": urlFifth}