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
    print("CREATEBOOKING")

    bookingForm = BookingForm()
    print("FORM", request.get_json())
    bookingForm['csrf_token'].data = request.cookies['csrf_token']

    if bookingForm.validate_on_submit():
        new_booking = request.json
        # new_booking = new_booking['userId']
        print("MY BOOKING", new_booking)
        booking = Booking(
            userId=current_user.id,
            cost_of_stay=new_booking["costOfStay"],
            start_day=new_booking["startDate"],
            end_day=new_booking["endDate"],
            farmId=new_booking["farmId"],
            number_of_guests=new_booking["numberOfGuests"],
            name_of_farm=new_booking["nameOfFarm"]
        )

        db.session.add(booking)
        db.session.commit()
        return {"bookings": booking.to_dict()}
    print("ERRORRS EESRESR ", bookingForm.errors)
    return {'errors': "error"}, 401