from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import booking, db, Booking
from app.forms import BookingForm


booking_routes = Blueprint("bookings", __name__)


@booking_routes.route("/")
@login_required
def bookings():
    bookings = Booking.query.filter(Booking.userId == current_user.id).all()
    return {"bookings": [booking.to_dict() for booking in bookings]}


@booking_routes.route("/<int:id>")
@login_required
def one_booking(id):
    booking = Booking.query.get(id)
    return booking.to_dict()


@booking_routes.route("/", methods=["POST"])
@login_required
def createBooking():

    # booking = BookingForm()

    new_booking = request.json
    new_booking = new_booking['userId']
    print("MY BOOKING", new_booking)
    booking = Booking(
        userId=current_user.id,
        cost_of_stay=new_booking["costOfStay"],
        start_day=new_booking["startDate"],
        end_day=new_booking["endDate"],
        farmId=new_booking["farmId"],
        number_of_guests=new_booking["numberOfGuests"],
    )

    # db.session.add(booking)
    # db.session.commit()
    return {"bookings": booking.to_dict()}