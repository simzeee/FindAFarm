from .db import db


class Farm(db.Model):

    __tablename__ = "farms"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    pricePerDay = db.Column(db.Numeric(asdecimal=False), nullable=False)
    description = db.Column(db.String, nullable=False)
    primaryImage = db.Column(db.String, nullable=False)
    secondImage = db.Column(db.String)
    thirdImage = db.Column(db.String)
    fourthImage = db.Column(db.String)
    fifthImage = db.Column(db.String)
    location = db.Column(db.String, nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # This is the farmer who made the farm
    user = db.relationship("User", back_populates="farms")
    bookings = db.relationship("Booking", back_populates="farmBooked")
    # farmAmenities = db.relationship("Amenity", back_populates="amenities")

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "pricePerDay": self.pricePerDay,
          "primaryImage": self.primaryImage,
          "secondImage": self.secondImage,
          "thirdImage": self.thirdImage,
          "fourthImage": self.fourthImage,
          "fifthImage": self.fifthImage,
          "location": self.location,
          "userId": self.userId,
          "description": self.description,
          "farmAmenities": [f.to_dict() for f in self.amenities]
        }