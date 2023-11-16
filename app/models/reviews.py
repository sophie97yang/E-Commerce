from .db import db

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Intger, nullable=False) #rating should always be required!
    review_date = db.Column(db.Date, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id")) #?
    member_id = db.Column(db.Integer,db.ForeignKey('members.id'))

    member = db.relationship("Member", back_populates="reviews") #?
    product = db.relationship("Product",back_populates="reviews")
    review_images = db.relationship("ReviewImage",back_populates="review")
