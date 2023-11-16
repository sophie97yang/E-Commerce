from .db import db

class ReviewImage(db.Model):
    __tablename__ = "review_images"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    # member_id = db.Column(db.Integer, db.ForeignKey("members.id"))
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))

    # member = db.relationship("Member", back_populates="ReviewImage") #?
    review = db.relationship("Review", back_populates="review_images") #?
