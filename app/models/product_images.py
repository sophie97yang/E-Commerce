from .db import db

class ProductImage(db.Model):
    __tablename__= "product_images"
    id = db.Column(db.Integer, primary_key=True)
    previewImage = db.Column(db.Boolean, default=False)
    url = db.Column(db.String, nullable=False)
    product_id = db.Column(db.Integer, ForeignKey=("products.id"))

    product = db.relationship("Product", back_populates="product_images")
