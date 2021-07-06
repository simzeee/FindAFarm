from .db import db


class Amenity(db.Model):

    __tablename__ = "amenities"

    id = db.Column(db.Integer, primary_key=True)
    goatYoga = db.Column(db.Boolean)
    pigRoast = db.Column(db.Boolean)
    tableMaking = db.Column(db.Boolean)
    farmId = db.Column(db.Integer, db.ForeignKey("farms.id"), nullable=False)

    amenities = db.relationship("Farm", back_populates="farmAmenities")

    def to_dict(self):
      
        return {
          "id": self.id,
          "Goat Yoga": self.goatYoga,
          "Pig Roast": self.pigRoast,
          "Table Making": self.tableMaking,
          "farmId": self.farmId
        }