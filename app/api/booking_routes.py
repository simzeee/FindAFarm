from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import booking, db, Booking


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