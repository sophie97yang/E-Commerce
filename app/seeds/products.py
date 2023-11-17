from ..models.products import Product
from ..models import db
from sqlalchemy.sql import text

def seed_products():

    print("seeding products NOWWWWWW ")

    product1 = Product(
        name= "Cheddar Cheese",
        seller=8,
        description= "A classic sharp cheddar cheese. Sharp taste. Jerry's favorite. Serves best with crackers and dried fruits.",
        price= 10.99,
        category= "Washed Rind",
        origin_city="San Francisco",
        origin_state="California",
        available=10
        )

    product2 = Product(
        name= "Brie Cheese",
        seller=1,
        description= "A soft and creamy French brie cheese. Mild flavor, serve with fruits, nuts, and crackers. ",
        price= 15.99,
        category= "Bloomy Rind",
        origin_city="San Diego",
        origin_state="California",
        available=20
        )

    product3 = Product(
        name= "Gouda Cheese",
        seller=2,
        description= "Oldest recorded cheese, 1284. Sweet creamy cheese can be best serve with wine!",
        price= 12.99,
        category= "Washed Rind",
        origin_city="San Antonio",
        origin_state="Texas",
        available=10
        )

    product4 = Product(
        name= "Blue Cheese",
        seller=3,
        description= "Accidental food. Aged cheese with blue to green mold. Best pair with wines, including Musket and Toki.",
        price= 18.99,
        category= "Bloomy Rind",
        origin_city="Los Angeles",
        origin_state="California",
        available=5
        )

    product5 = Product(
        name= "Mozzarella Cheese",
        seller=4,
        description= "Soft fresh cheese from buffalo. Ideal for pizza and pasta!",
        price= 12.99,
        category= "Fresh",
        origin_city="Hoboken",
        origin_state="New Jersey",
        available=50
        )

    product6 = Product(
        name= "Cream Cheese",
        seller=8,
        description= "Soft creamy cheese, with smooth and rich texture. Used in various dishes including sushi, lox sandwhich, and toasts. Did not originate from Philadelphia!",
        price= 4.99,
        category= "Bloomy Rind",
        origin_city="San Francisco",
        origin_state="California",
        available=100
        )

    product7 = Product(
        name= "Ricotta Cheese",
        seller=8,
        description= "Soft, spreadable, slightly sweet flavor. Best serve with scramble eggs, french toasts, and pancakes.",
        price= 24.99,
        category= "Fresh",
        origin_city="San Francisco",
        origin_state="California",
        available=3
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

def undo_products():
    db.session.execute(text("DELETE FROM products"))
    db.session.commit()
