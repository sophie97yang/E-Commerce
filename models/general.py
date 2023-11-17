#will split these into different files

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

# fix many spellings, if you can't spell, just copy n paste
class Member(db.Model):
    __tablename__= "members"
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    # email should be unique, yes??
    email = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(20), nullable=False)
    address = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    seller = db.Column(db.Boolean, nullable=False)

    #not sure if necessary
    review = db.relationship("Review", uselist=False, back_populates="member")


#true joins table?
wishlist = db.Table(
    "wishlist",
    db.Model.metadata,
    db.Column("member_id", db.Integer, db.ForeignKey("members.id"), primary_key=True),
    db.Column("product_id", db.Integer, db.ForeignKey("products.id"), primary_key=True) #products.id?
)


class Wishlist(db.Model):
    __tablename__= "wishlist"

    id = db.Column(db.Integer, primary_key=True)
    # members_id = db.Column(db.Integer, ForeignKey=("members.id"))
    # db.ForeignKey for consistency
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))


# fixed typo, db.Integer
class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=True) #okay to leave empty review?
    review_date = db.Column(db.Date, nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey("products.id")) #?
# lowercase r for naming conventions
    member = db.relationship("Member", back_populates="review") #?


class ReviewImage(db.Model):
    __tablename__ = "reviewImages"
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"))
    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"))
   # lowercase r for naming conventions 
    member = db.relationship("Member", back_populates="reviewImage") #?
    review = db.relationship("Review", back_populates="reviewImage") #?


class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(20), nullable=False)
    origin_city = db.Column(db.String(20), nullable=False)
    origin_state = db.Column(db.String(20), nullable=False)
    # image = db.Column(db.String(255)) #? would this be easier



    #1-to-1 with wishlist -> members
    #1-to-Many with reviews
    #1-to-Many with productDetails???


class ShoppingCart(db.Model):
    __tablename__ = "shoppingCart"
    id = db.Column(db.Integer, primary_key=True)
    purchase_date = db.Column(db.Date, nullable=False)
    purchased = db.Column(db.Boolean, nullable=False) #False?

    # member_id = db.relationship(db.Integer, ForeignKey=("members.id")) ?? You mean this? below
    member_id = db.Column(db.Integer, db.ForeignKey("members.id"))

class OrderDetail(db.Model):
    __tablename__= "orderDetails"
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    # order_date = db.Column(db.Date) #? Should we add nullable = True if not false?
    order_date = db.Column(db.Date, nullable=True)
    product_id = db.Column(db.Integer, ForeignKey=("products.id"))
    shoppingCart_id = db.Column(db.Integer, ForeignKey=("shoppingCart.id")) #proper capitlization?

    product = db.relationship("Product", back_populates="OrderDetail")
    shoppingcart = db.relationship("ShoppingCart", back_populates="OrderDetail")


class ProductImage(db.Model):
    __tablename__= "productImages"
    id = db.Column(db.Integer, primary_key=True)
    previewImage = db.Column(db.Boolean, nullable=True) #True??
    url = db.Column(db.String, nullable=False)

    product_id = db.Column(db.Integer, ForeignKey=("products.id"))

    product = db.relationship("Product", back_populates="productImage")






# members -> reviews (one to many)
# members -> products (many to one)
# products -> productImages (one to one)

# members -> shoppingCart (one to many)
# shoppingCart -> orderDetails (one to many)
# orderDetails -> products (many to one)