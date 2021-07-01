from .db import db


class Booking(db.Model):

    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cost_of_stay = db.Column(db.Numeric(asdecimal=False), nullable=False)
    start_day = db.Column(db.String, nullable=False)
    end_day = db.Column(db.String, nullable=False)
    farmId = db.Column(db.Integer, db.ForeignKey("farms.id"), nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    name_of_farm = db.Column(db.String, nullable=False)

    userBooking = db.relationship("User", back_populates="userBooked")
    farmBooked = db.relationship("Farm", back_populates="bookings")

    def to_dict(self):
        return {
          "id": self.id,
          "userId": self.userId,
          "costOfStay": self.cost_of_stay,
          "startDate": self.start_day,
          "endDate": self.end_day,
          "farmId": self.farmId,
          "numberOfGuests": self.number_of_guests,
          "nameOfFarm": self.name_of_farm
        }