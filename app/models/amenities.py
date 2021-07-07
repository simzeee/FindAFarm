from sqlalchemy.orm import backref
from .db import db

farm_amenities = db.Table('farm_amenities', 
db.Column("amenities_id", db.Integer, db.ForeignKey("amenities.id"), primary_key=True),
db.Column("farm_id", db.Integer, db.ForeignKey("farms.id"), primary_key=True))


class Amenity(db.Model):

    __tablename__ = "amenities"

    id = db.Column(db.Integer, primary_key=True)
    amenityName = db.Column(db.String)
    # goatYoga = db.Column(db.Boolean)
    # pigRoast = db.Column(db.Boolean)
    # tableMaking = db.Column(db.Boolean)
    # farmId = db.Column(db.Integer, db.ForeignKey("farms.id"), nullable=False)

    # amenities = db.relationship("Farm", back_populates="farmAmenities")
    farms = db.relationship("Farm", backref="amenities", secondary="farm_amenities")

    def to_dict(self):
      
        return {
          "id": self.id,
          "amenityName": self.amenityName
        }