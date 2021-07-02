from .db import db


class Image(db.Model):

    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer)
    url = db.Column(db.String)

    def to_dict(self):
        return {
          "id": self.id,
          "user": self.user,
          "url": self.url
        }