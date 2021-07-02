from .db import db


class Image(db.Model):

    __tablename__ = "images"

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Integer, nullable=False)
    url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
          "id": self.id,
          "user": self.user,
          "url": self.url
        }