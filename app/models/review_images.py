from .db import db, environment, SCHEMA, add_prefix_for_prod

class ReviewImage(db.Model):
    __tablename__ = "review_images"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))

    review = db.relationship("Review", back_populates="review_images") #?

#no need to return review images - this will get returned with reviews
    def to_dict(self):
        return {
            "id": self.id,
            "url": self.url,
            "review_id": self.review_id
        }
