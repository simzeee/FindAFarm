from .db import db


class Farm(db.Model):

    __tablename__ = "farms"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    pricePerDay = db.Column(db.Numeric(asdecimal=False), nullable=False)
    image = db.Column(db.String)
    location = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # This is the farmer who made the farm
    user = db.relationship("User", back_populates="farms")
    bookings = db.relationship("Booking", back_populates="farmBooked")

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "pricePerDay": self.pricePerDay,
          "image": self.image,
          "location": self.location,
          "userId": self.userId,
        }