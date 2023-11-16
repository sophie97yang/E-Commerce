from .db import db
from .wishlists import wishlists
from .order_details import order_details

class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    seller = db.Column(db.Integer,db.ForeignKey("members.id"))
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(20), nullable=False)
    origin_city = db.Column(db.String(20), nullable=False)
    origin_state = db.Column(db.String(20), nullable=False)
    available= db.Column(db.Integer,nullable=False)

    reviews = db.relationship("Review",back_populates='product')
    members = db.relationship("Member",secondary=wishlists,back_populates='products')
    product_images = db.relationship("ProductImage",back_populates="product")
    orders = db.relationship("orders",secondary=order_details,back_populates="products")
    # seller = db.relationship("Member",back_populates="seller_products")

    # not returning members (through wishlist) or orders(through order_details)
    # only returning total rating and review length
    def to_dict(self):
        preview_image = [image for image in self.product_images if image.previewImage][0]
        reviews_length = len(self.reviews)
        rating_sum = 0
        for review in self.reviews:
            rating_sum+= int(review.rating)
        product_dict =  {
            "id": self.id,
            "seller": self.seller,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "origin":(self.origin_city,self.origin_state),
            "reviews":reviews_length,
            "rating_total":rating_sum,
            "preview":preview_image,
            "available":self.available
        }
        return product_dict

    # not returning members (through wishlist) or orders(through order_details)
    # returning all images and all reviews
    def to_dict_descriptive(self):
        product_dict =  {
            "id": self.id,
            "seller": self.seller,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "origin":(self.origin_city,self.origin_state),
            "reviews":self.reviews,
            "images":self.product_images,
            "available":self.available
        }
        return product_dict
