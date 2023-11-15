#will split these into different files

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Member(db.Model):
    __tablename__= "members"
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(30), nulalble=False)
    password = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    seller = db.Column(db.Boolean, nullable=False)

    #not sure if necessary
    review = db.relationship("Review", uselist=False, back_populates="member")

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Intger, nullable=True) #okay to leave empty review?
    review_date = db.Column(db.Date, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id")) #?

    member = db.relationship("Member", back_populates="Review") #?


class ReviewImage(db.Model):
    __tablename__ = "reviewImages"
    id = db.Column(db.Integer, primary_key=True)
    



class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)


class ShoppingCart(db.Model):
    __tablename__ = "shoppingCart"
    id = db.Column(db.Integer, primary_key=True)
    purchaseDate = db.Column(db.Date)
    purchased = db.Column(db.Boolean)

    member_id = db.relationship()


class OrderDetail(db.Model):
    __tablename__= "orderDetails"
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    order_date = db.Column(db.Date) #?

    product_id
    shoppingCart_id


class productImage(db.Model):
    __tablename__= "productImages"
    id = db.Column(db.Integer, primary_key=True)
    previewImage = db.Column(db.Boolean)
    url = db.Column(db.String, nullable=False)





# members -> reviews (one to many)
# members -> products (many to one)
# products -> productImages (one to one)

# members -> shoppingCart (one to many)
# shoppingCart -> orderDetails (one to many)
# orderDetails -> products (many to one)