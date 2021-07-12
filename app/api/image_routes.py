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

    farmName = request.form["farmName"]

    print("farmName RIGHT HERE", farmName)
    print("PRIMARY IMAGE", request.files["primaryImage"])
    print("ALL FILES", request.files)

    if len(request.files) == 1:
        image = request.files["primaryImage"] 
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        urlPrimary = upload["url"]
        new_image = Image(user=current_user.id, primaryImage=urlPrimary, farmName=farmName)
        print("A NEW IMAGE", new_image)
        db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary}
    elif len(request.files) == 2:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(secondImage.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        secondImage.filename = get_unique_filename(secondImage.filename)
        upload = upload_file_to_s3(image)
        upload2 = upload_file_to_s3(secondImage)
        if "url" not in upload:
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    secondImage=urlSecond, farmName=farmName)
        db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond}
    elif len(request.files) == 3:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        thirdImage = request.files["thirdImage"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(secondImage.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(thirdImage.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        secondImage.filename = get_unique_filename(secondImage.filename)
        thirdImage.filename = get_unique_filename(thirdImage.filename)
        upload = upload_file_to_s3(image)
        upload2 = upload_file_to_s3(secondImage)
        upload3 = upload_file_to_s3(thirdImage)
        if "url" not in upload:
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        if "url" not in upload3:
            return upload3, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        urlThird = upload3["url"]
        new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    secondImage=urlSecond, thirdImage=urlThird, farmName=farmName)
        db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird}
    elif len(request.files) == 4:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        thirdImage = request.files["thirdImage"]
        fourthImage = request.files["fourthImage"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(secondImage.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(thirdImage.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(fourthImage.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        secondImage.filename = get_unique_filename(secondImage.filename)
        thirdImage.filename = get_unique_filename(thirdImage.filename)
        fourthImage.filename = get_unique_filename(fourthImage.filename)
        upload = upload_file_to_s3(image)
        upload2 = upload_file_to_s3(secondImage)
        upload3 = upload_file_to_s3(thirdImage)
        upload4 = upload_file_to_s3(fourthImage)
        if "url" not in upload:
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        if "url" not in upload3:
            return upload3, 400
        if "url" not in upload4:
            return upload4, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        urlThird = upload3["url"]
        urlFourth = upload4["url"]
        new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    secondImage=urlSecond, thirdImage=urlThird, fourthImage=urlFourth, farmName=farmName)
        db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird,
    "urlFourth": urlFourth}
    elif len(request.files) == 5:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        thirdImage = request.files["thirdImage"]
        fourthImage = request.files["fourthImage"]
        fifthImage = request.files["fifthImage"]
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
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        if "url" not in upload3:
            return upload3, 400
        if "url" not in upload4:
            return upload4, 400
        if "url" not in upload5:
            return upload5, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        urlThird = upload3["url"]
        urlFourth = upload4["url"]
        urlFifth = upload5["url"]
        new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    secondImage=urlSecond, thirdImage=urlThird, fourthImage=urlFourth,
    fifthImage=urlFifth, farmName=farmName)
        db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird,
    "urlFourth": urlFourth, "urlFifth": urlFifth}


@image_routes.route('/', methods=["PUT"])
@login_required
def edit_image():
    print('YOU REACHED EDIT')
    print("FORM", request.form)
    print(len(request.files))
    print("FILES PRIMARY IMAGE", request.files['primaryImage'])
    
    farmId = request.form["farmId"]
    imageToUpdate = Image.query.filter(Image.farmId == farmId).first()
    print("IMAGE IS RIGHT HERE", imageToUpdate.farmName)

    if len(request.files) == 1:
        image = request.files["primaryImage"] 
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        urlPrimary = upload["url"]
        imageToUpdate.primaryImage = urlPrimary
        imageToUpdate.secondImage = None
        imageToUpdate.thirdImage = None
        imageToUpdate.fourthImage = None
        imageToUpdate.fifthImage = None
        db.session.commit()
        return {"urlPrimary": urlPrimary}
    elif len(request.files) == 2:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(secondImage.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        secondImage.filename = get_unique_filename(secondImage.filename)
        upload = upload_file_to_s3(image)
        upload2 = upload_file_to_s3(secondImage)
        if "url" not in upload:
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        imageToUpdate.primaryImage = urlPrimary
        imageToUpdate.secondImage = urlSecond
        imageToUpdate.thirdImage = None
        imageToUpdate.fourthImage = None
        imageToUpdate.fifthImage = None
    #     new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    # secondImage=urlSecond, farmName=farmName)
    #     db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond}
    elif len(request.files) == 3:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        thirdImage = request.files["thirdImage"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(secondImage.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(thirdImage.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        secondImage.filename = get_unique_filename(secondImage.filename)
        thirdImage.filename = get_unique_filename(thirdImage.filename)
        upload = upload_file_to_s3(image)
        upload2 = upload_file_to_s3(secondImage)
        upload3 = upload_file_to_s3(thirdImage)
        if "url" not in upload:
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        if "url" not in upload3:
            return upload3, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        urlThird = upload3["url"]
        imageToUpdate.primaryImage = urlPrimary
        imageToUpdate.secondImage = urlSecond
        imageToUpdate.thirdImage = urlThird
        imageToUpdate.fourthImage = None
        imageToUpdate.fifthImage = None
    #     new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    # secondImage=urlSecond, thirdImage=urlThird, farmName=farmName)
    #     db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird}
    elif len(request.files) == 4:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        thirdImage = request.files["thirdImage"]
        fourthImage = request.files["fourthImage"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(secondImage.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(thirdImage.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(fourthImage.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        secondImage.filename = get_unique_filename(secondImage.filename)
        thirdImage.filename = get_unique_filename(thirdImage.filename)
        fourthImage.filename = get_unique_filename(fourthImage.filename)
        upload = upload_file_to_s3(image)
        upload2 = upload_file_to_s3(secondImage)
        upload3 = upload_file_to_s3(thirdImage)
        upload4 = upload_file_to_s3(fourthImage)
        if "url" not in upload:
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        if "url" not in upload3:
            return upload3, 400
        if "url" not in upload4:
            return upload4, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        urlThird = upload3["url"]
        urlFourth = upload4["url"]

        imageToUpdate.primaryImage = urlPrimary
        imageToUpdate.secondImage = urlSecond
        imageToUpdate.thirdImage = urlThird
        imageToUpdate.fourthImage = urlFourth
        imageToUpdate.fifthImage = None

    #     new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    # secondImage=urlSecond, thirdImage=urlThird, fourthImage=urlFourth, farmName=farmName)
    #     db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird,
    "urlFourth": urlFourth}
    elif len(request.files) == 5:
        image = request.files["primaryImage"]
        secondImage = request.files["secondImage"]
        thirdImage = request.files["thirdImage"]
        fourthImage = request.files["fourthImage"]
        fifthImage = request.files["fifthImage"]
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
            return upload, 400
        if "url" not in upload2:
            return upload2, 400
        if "url" not in upload3:
            return upload3, 400
        if "url" not in upload4:
            return upload4, 400
        if "url" not in upload5:
            return upload5, 400
        urlPrimary = upload["url"]
        urlSecond = upload2["url"]
        urlThird = upload3["url"]
        urlFourth = upload4["url"]
        urlFifth = upload5["url"]

        imageToUpdate.primaryImage = urlPrimary
        imageToUpdate.secondImage = urlSecond
        imageToUpdate.thirdImage = urlThird
        imageToUpdate.fourthImage = urlFourth
        imageToUpdate.fifthImage = urlFifth

    #     new_image = Image(user=current_user.id, primaryImage=urlPrimary,
    # secondImage=urlSecond, thirdImage=urlThird, fourthImage=urlFourth,
    # fifthImage=urlFifth, farmName=farmName)
    #     db.session.add(new_image)
        db.session.commit()
        return {"urlPrimary": urlPrimary, "urlSecond": urlSecond, "urlThird": urlThird,
    "urlFourth": urlFourth, "urlFifth": urlFifth}