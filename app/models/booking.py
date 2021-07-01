from .db import db


class Booking(db.Model):

    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    costOfStay = db.Column(db.Numeric(asdecimal=False), nullable=False)
    startDate = db.Column(db.String, nullable=False)
    endDate = db.Column(db.String, nullable=False)
    farmId = db.Column(db.Integer, db.ForeignKey("farms.id"), nullable=False)
    numberOfGuests = db.Column(db.Integer, nullable=False)
    nameOfFarm = db.Column(db.String, nullable=False)

    userBooking = db.relationship("User", back_populates="userBooked")
    farmBooked = db.relationship("Farm", back_populates="bookings")

    def to_dict(self):
        return {
          "id": self.id,
          "userId": self.userId,
          "costOfStay": self.costOfStay,
          "startDate": self.startDate,
          "endDate": self.endDate,
          "farmId": self.farmId,
          "numberOfGuests": self.numberOfGuests,
          "nameOfFarm": self.nameOfFarm
        }