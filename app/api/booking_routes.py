from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Booking
from app.forms import BookingForm, booking_form


booking_routes = Blueprint("bookings", __name__)


@booking_routes.route("/")
@login_required
def bookings():
    bookings = Booking.query.filter(Booking.userId == current_user.id).all()
    print("BOOKINGS", {"bookings": [booking.to_dict() for booking in bookings]})
    return {"bookings": [booking.to_dict() for booking in bookings]}


@booking_routes.route("/<int:id>")
@login_required
def one_booking(id):
    booking = Booking.query.get(id)
    return booking.to_dict()


@booking_routes.route("/", methods=["POST"])
@login_required
def createBooking():

    bookingForm = BookingForm()
    bookingForm['csrf_token'].data = request.cookies['csrf_token']

    if bookingForm.validate_on_submit():
        new_booking = request.json
        # new_booking = new_booking['userId']

        booking = Booking(
            userId=current_user.id,
            costOfStay=new_booking["costOfStay"],
            startDate=new_booking["startDate"],
            endDate=new_booking["endDate"],
            farmId=new_booking["farmId"],
            numberOfGuests=new_booking["numberOfGuests"],
            nameOfFarm=new_booking["nameOfFarm"]
        )

        db.session.add(booking)
        db.session.commit()
        return {"bookings": booking.to_dict()}
    return {'errors': "error"}, 401


@booking_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def edit_one_booking(id):

    bookingForm = BookingForm()
    bookingForm['csrf_token'].data = request.cookies['csrf_token']

    if bookingForm.validate_on_submit():
        print("REQUEST", request.json)
        print("WE ARE IN HERE")
        booking = Booking.query.get(request.json['bookingId'])

        # booking.id = request.json["id"]
        booking.userId = request.json["userId"]
        booking.costOfStay = request.json["costOfStay"]
        booking.startDate = request.json["startDate"]
        booking.endDate = request.json["endDate"]
        booking.farmId = request.json["farmId"]
        booking.numberOfGuests = request.json["numberOfGuests"]
        booking.nameOfFarm = request.json["nameOfFarm"]

        db.session.commit()
        return {"bookings": booking.to_dict()}
    print("ERRORS", bookingForm.errors)
    return {"errors": bookingForm.errors}


@booking_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_one_booking(id):
    booking = Booking.query.get(id)

    db.session.delete(booking)
    db.session.commit()
    return {"id": id}
