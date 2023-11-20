from ..models.products import Product
# from ..models.product_images import ProductImage
from ..models import db, SCHEMA, environment
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
        available=10,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )
    # image1= ProductImage(
    #     preview_image = True,
    #     url="https://store.pagelsponderosa.com/wp-content/uploads/2020/08/Mild-Cheddar-Block-resized.jpg",
    #     product_id=1

    # )
    product2 = Product(
        name= "Brie Cheese",
        seller=1,
        description= "A soft and creamy French brie cheese. Mild flavor, serve with fruits, nuts, and crackers. ",
        price= 15.99,
        category= "Bloomy Rind",
        origin_city="San Diego",
        origin_state="California",
        available=20,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )

    # image2= ProductImage(
    #     preview_image = True,
    #     url="https://www.allrecipes.com/thmb/M-8SHLikGW_zRe8CdCjqbBut2Y0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-527437499-2000-e87019ade85842ccb97785805474983b.jpg",
    #     product_id=2

    # )
    product3 = Product(
        name= "Gouda Cheese",
        seller=2,
        description= "Oldest recorded cheese, 1284. Sweet creamy cheese can be best serve with wine!",
        price= 12.99,
        category= "Washed Rind",
        origin_city="San Antonio",
        origin_state="Texas",
        available=10,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )

    # image3= ProductImage(
    #     preview_image = True,
    #     url="https://m.media-amazon.com/images/I/81CyK+H6jxL.jpg",
    #     product_id=3

    # )


    product4 = Product(
        name= "Blue Cheese",
        seller=3,
        description= "Accidental food. Aged cheese with blue to green mold. Best pair with wines, including Musket and Toki.",
        price= 18.99,
        category= "Bloomy Rind",
        origin_city="Los Angeles",
        origin_state="California",
        available=5,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )

    # image4= ProductImage(
    #     preview_image = True,
    #     url="https://cdn.britannica.com/09/3809-004-50E1BB9B/Roquefort-cheese.jpg",
    #     product_id=4

    # )

    product5 = Product(
        name= "Mozzarella Cheese",
        seller=4,
        description= "Soft fresh cheese from buffalo. Ideal for pizza and pasta!",
        price= 12.99,
        category= "Fresh",
        origin_city="Hoboken",
        origin_state="New Jersey",
        available=50,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )

    # image5= ProductImage(
    #     preview_image = True,
    #     url="https://cdn.britannica.com/09/3809-004-50E1BB9B/Roquefort-cheese.jpg",
    #     product_id=5

    # )

    product6 = Product(
        name= "Cream Cheese",
        seller=8,
        description= "Soft creamy cheese, with smooth and rich texture. Used in various dishes including sushi, lox sandwhich, and toasts. Did not originate from Philadelphia!",
        price= 4.99,
        category= "Bloomy Rind",
        origin_city="San Francisco",
        origin_state="California",
        available=100,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )

    # image6= ProductImage(
    #     preview_image = True,
    #     url="https://upload.wikimedia.org/wikipedia/commons/f/f7/Philly_cream_cheese.jpg",
    #     product_id=6

    # )

    product7 = Product(
        name= "Ricotta Cheese",
        seller=8,
        description= "Soft, spreadable, slightly sweet flavor. Best serve with scramble eggs, french toasts, and pancakes.",
        price= 24.99,
        category= "Fresh",
        origin_city="San Francisco",
        origin_state="California",
        available=3,
        preview_image="a.jpg",
        product_image1="b.jpeg",
        product_image2="c.png",
        product_image3="d.jpg",
        product_image4="e.jpeg",
        )

    # image7= ProductImage(
    #     preview_image = True,
    #     url="https://i5.walmartimages.com/seo/Great-Value-Original-Ricotta-Cheese-15-oz-Refrigerated_833dbb9b-8fd8-4538-a86f-76aed6db343e.ce509fb7a5c093ceb56407bd5419767d.jpeg",
    #     product_id=7

    # )



    # images = [image1,image2,image3,image4,image5,image6,image7]
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    # add_images = [db.session.add(image) for image in images]

    db.session.commit()

    print("Successful CHEESY Products completed!!!!!")

    return [product1, product2, product3, product4, product5, product6, product7]


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM products"))
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
