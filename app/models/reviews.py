from .db import db

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False) #rating should always be required!
    content=db.Column(db.String(1000))
    review_date = db.Column(db.Date, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id")) #?
    member_id = db.Column(db.Integer,db.ForeignKey('members.id'))

    member = db.relationship("Member", back_populates="reviews") #?
    product = db.relationship("Product",back_populates="reviews")
    review_images = db.relationship("ReviewImage",back_populates="review")



    def to_dict(self):
        return {
            "id": self.id,
            "rating": self.rating,
            "review_date": self.review_date,
            "product_id": self.product_id, #do not need to return all product info (just id)
            "member":self.member,
            "images":self.review_images
        }
