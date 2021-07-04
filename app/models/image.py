from .db import db


class Image(db.Model):

    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, nullable=False)
    primaryImage = db.Column(db.String, nullable=False)
    secondImage = db.Column(db.String)
    thirdImage = db.Column(db.String)
    fourthImage = db.Column(db.String)
    fifthImage = db.Column(db.String)
    farmName = db.Column(db.String)
    farmId = db.Column(db.Integer)

    def to_dict(self):
        return {
          "id": self.id,
          "user": self.user,
          "primaryImage": self.primaryImage,
          "secondImage": self.secondImage,
          "thirdImage": self.thirdImage,
          "fourthImage": self.fourthImage,
          "fifthImage": self.fifthImage,
          "farmName": self.farmName,
          "farmId": self.farmId
        }