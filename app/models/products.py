from .db import db, environment, SCHEMA, add_prefix_for_prod
from .wishlists import wishlists
# from .order_details import order_details

class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("members.id")))
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(20), nullable=False)
    origin_city = db.Column(db.String(20), nullable=False)
    origin_state = db.Column(db.String(20), nullable=False)
    available= db.Column(db.Integer,nullable=False)
    # add images attributes for easy queries
    preview_image = db.Column(db.String(255), nullable=False)
    product_image1 = db.Column(db.String(255))
    product_image2 = db.Column(db.String(255))
    product_image3 = db.Column(db.String(255))
    product_image4 = db.Column(db.String(255))

    reviews = db.relationship("Review",back_populates='product')
    members = db.relationship("Member",secondary=wishlists,back_populates='products')
    # product_images = db.relationship("ProductImage",back_populates="product")
    orders = db.relationship("OrderDetail",back_populates="product")

    # not returning members (through wishlist) or orders(through order_details)
    # only returning total rating and review length
    #get all products
    def to_dict(self):
        # accessing previewImage, but should be preview_image
        # should invoke todict method because using arrtibutes from products images
        # had to remove [0], for now, preview image null updon creating products
        # preview_image = [image.to_dict() for image in self.product_images if image.preview_image]

        # print("PRODUCT MODELLL Preview Image:", preview_image)

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
            # "preview":preview_image,
            "available":self.available,
            "preview_image":self.preview_image
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
            "reviews":[review.to_dict_descriptive() for review in self.reviews],
            "product_image1":self.product_image1,
            "product_image2":self.product_image2,
            "product_image3":self.product_image3,
            "product_image4":self.product_image4,
            "available":self.available,
            "orders":[order.to_dict() for order in self.orders]
        }
        return product_dict
