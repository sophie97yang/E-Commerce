from app.models import db, Member
from datetime import datetime

def seed_members():
    
    print("seeding members NOWWWWWW")
    
    member1 = Member(
        firstName= "Sophie",
        lastName= "Yang",
        email= "sophie@gmail.com",
        password= "peteristhebest",
        address= "123 Red Ave",
        city= "San Diego",
        state= "California",
        seller= True,
        )
    
    member2 = Member(
        firstName= "Peang",
        lastName= "Ngo",
        email= "peang@gmail.com",
        password= "peteristhebest",
        address= "501 Blue Ave",
        city= "San Antonio",
        state= "Texas",
        seller= True,
        )
    
    member3 = Member(
        firstName= "Yoseph",
        lastName= "Latif",
        email= "yoseph@gmail.com",
        password= "peteristhebest",
        address= "967 Purple St",
        city= "Los Angeles",
        state= "California",
        seller= True,
        )
    
    member4 = Member(
        firstName= "Peter",
        lastName= "Dinh",
        email= "peter@gmail.com",
        password= "peteristhebest",
        address= "267 Royal Ave",
        city= "Hoboken",
        state= "New Jersey",
        seller= True,
        )
    
    member5 = Member(
        firstName= "Brad",
        lastName= "Simpson",
        email= "brad@gmail.com",
        password= "password1",
        address= "564 Wyncote Ave",
        city= "Cherry Hill",
        state= "New Jersey",
        seller= False,
        )
    
    member6 = Member(
        firstName= "David",
        lastName= "Nash",
        email= "david@gmail.com",
        password= "password2",
        address= "933 Spruce St",
        city= "Boston",
        state= "Massachusetts",
        seller= False,
        )
    
    member7 = Member(
        firstName= "Andrew",
        lastName= "Tran",
        email= "andrew@gmail.com",
        password= "password3",
        address= "155 Lehigh St",
        city= "Chicago",
        state= "Illinois",
        seller= False,
        )
    
    db.session.add(member1)
    db.session.add(member2)
    db.session.add(member3)
    db.session.add(member4)
    db.session.add(member5)
    db.session.add(member6)
    db.session.add(member7)
    
    db.session.commit()
    
    print("Successful Member completed!!!!!")
    
    return [member1, member2, member3, member4, member5, member6, member7]


# ---------------------------------------------------------------------------------------------------------------

# wishlist

def seed_wishlists():
    
    print("seeding wishlists NOWWWWWW ")
    
    wishlist1 = Wishlist(
        member_id=1,
        product_id=1
        )
    
    wishlist2 = Wishlist(
        member_id=1,
        product_id=2
        )
    
    wishlist3 = Wishlist(
        member_id=1,
        product_id=3
        )
    
    wishlist4 = Wishlist(
        member_id=2,
        product_id=2
        )
    
    wishlist5 = Wishlist(
        member_id=3,
        product_id=3
        )
    
    
    db.session.add(wishlist1)
    db.session.add(wishlist2)
    db.session.add(wishlist3)
    db.session.add(wishlist4)
    db.session.add(wishlist5)

    
    db.session.commit()
    
    print("Successful Wishlists completed!!!!!")
    
    return [wishlist1, wishlist2, wishlist3, wishlist4, wishlist5]


    
    


# ---------------------------------------------------------------------------------------------------------------

def seed_reviews():
    
    print("seeding reviews NOWWWWWW ")
    
    review1 = Review(
        rating= 1,
        review_date= datetime.now(),
        product_id= 1,
        member_id= 1,
        )
    
    review2 = Review(
        rating= 2,
        review_date= datetime.now(),
        product_id= 2,
        member_id= 1,
        )
    
    review3 = Review(
        rating= 5,
        review_date= datetime.now(),
        product_id= 1,
        member_id= 2,
        )
    
    review4 = Review(
        rating= 1,
        review_date= datetime.now(),
        product_id= 3,
        member_id= 2,
        )
    
    review5 = Review(
        rating= 5,
        review_date= datetime.now(),
        product_id= 1,
        member_id= 3,
        )
    
    review6 = Review(
        rating= 3,
        review_date= datetime.now(),
        product_id= 1,
        member_id= 3,
        )
    
    review7 = Review(
        rating= 1,
        review_date= datetime.now(),
        product_id= 2,
        member_id= 4,
        )
    
    
    
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    
    db.session.commit()
    
    print("Successful Reviewsss completed!!!!!")
    
    return [review1, review2, review3, review4, review5, review6, review7]





# ---------------------------------------------------------------------------------------------------------------


def seed_products():
    
    print("seeding products NOWWWWWW ")
    
    product1 = Product(
        name= "Cheddar Cheese",
        description= "A classic sharp cheddar cheese. Sharp taste. Jerry's favorite. Serves best with crackers and dried fruits.",
        price= 10.99,
        category= "Washed Rind",
        origin_city="Cheddar",
        origin_state="England",
        )
    
    product2 = Product(
        name= "Brie Cheese",
        description= "A soft and creamy French brie cheese. Mild flavor, serve with fruits, nuts, and crackers. ",
        price= 15.99,
        category= "Bloomy Rind",
        origin_city="Paris",
        origin_state="France",
        )
    
    product3 = Product(
        name= "Gouda Cheese",
        description= "Oldest recorded cheese, 1284. Sweet creamy cheese can be best serve with wine!",
        price= 12.99,
        category= "Washed Rind",
        origin_city="Amsterdam",
        origin_state="North Holland",
        )
    
    product4 = Product(
        name= "Blue Cheese",
        description= "Accidental food. Aged cheese with blue to green mold. Best pair with wines, including Musket and Toki.",
        price= 18.99,
        category= "Bloomy Rind",
        origin_city="Roquefort",
        origin_state="France",
        )
    
    product5 = Product(
        name= "Mozzarella Cheese",
        description= "Soft fresh cheese from buffalo. Ideal for pizza and pasta!",
        price= 12.99,
        category= "Fresh",
        origin_city="Naples",
        origin_state="Italy",
        )
    
    product6 = Product(
        name= "Crean Cheese",
        description= "Soft creamy cheese, with smooth and rich texture. Used in various dishes including sushi, lox sandwhich, and toasts. Did not originate from Philadelphia!",
        price= 4.99,
        category= "Bloomy Rind",
        origin_city="Chester",
        origin_state="New York",
        )
    
    product7 = Product(
        name= "Ricotta Cheese",
        description= "Soft, spreadable, slightly sweet flavor. Best serve with scramble eggs, french toasts, and pancakes.",
        price= 24.99,
        category= "Fresh",
        origin_city="Rome",
        origin_state="Italy",
        )
    
    
    
    
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    
    db.session.commit()
    
    print("Successful CHEESY Products completed!!!!!")
    
    return [product1, product2, product3, product4, product5, product6, product7]




# ---------------------------------------------------------------------------------------------------------------



def seed_shopping_carts():
    
    print("seeding shoppingCartsss!!! NOWWWWWW ")
    
    shopping_cart1 = ShoppingCart(
        purchase_date=datetime.now(),
        purchased=False,
        member_id=1
        )
    
    shopping_cart2 = ShoppingCart(
        purchase_date=datetime.now(),
        purchased=False,
        member_id=2
        )
        
    shopping_cart3 = ShoppingCart(
        purchase_date=datetime.now(),
        purchased=True,
        member_id=3
        )
            
    shopping_cart4 = ShoppingCart(
        purchase_date=datetime.now(),
        purchased=True,
        member_id=4
        )



    db.session.add(shopping_cart1)
    db.session.add(shopping_cart2)
    db.session.add(shopping_cart3)
    db.session.add(shopping_cart4)

    
    db.session.commit()
    
    print("Successful ChoppingCart completed!!!!!")
    
    return [shopping_cart1, shopping_cart2, shopping_cart3, shopping_cart4]