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
        preview_image="https://store.pagelsponderosa.com/wp-content/uploads/2020/08/Mild-Cheddar-Block-resized.jpg",
        product_image1="https://i.insider.com/615dfc059237a2001827ffa2?width=1136&format=jpeg",
        product_image2="https://somethingaboutsandwiches.com/wp-content/uploads/2022/06/classic-cheese-sandwich.jpg",
        product_image3="https://insanelygoodrecipes.com/wp-content/uploads/2022/08/Homemade-Sausage-Balls-with-Cheddar-Cheese-and-Dipping-Sauce.jpg",
        product_image4="https://www.tasteofhome.com/wp-content/uploads/2017/10/cheese-board_CHMZ19_PU4381_C10_30_2b.jpg",
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
        preview_image="https://www.allrecipes.com/thmb/M-8SHLikGW_zRe8CdCjqbBut2Y0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-527437499-2000-e87019ade85842ccb97785805474983b.jpg",
        product_image1="https://www.recipetineats.com/wp-content/uploads/2019/10/Baked-Brie_3-SQ.jpg",
        product_image2="https://basicswithbails.com/wp-content/uploads/2022/11/easy-baked-brie-recipe-with-apricot-jam.jpg"
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
        preview_image="https://m.media-amazon.com/images/I/81CyK+H6jxL.jpg",
        product_image1="https://www.ggcatering.com/blog/wp-content/uploads/2015/06/wine-cheese-2015_website-icon.jpg",
        product_image2="https://www.oliviascuisine.com/wp-content/uploads/2017/03/gouda-ham-melt.jpg",
        product_image3="https://www.stbarthswine.com/cdn/shop/products/SlicedGoudaCheese.jpg"
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
        preview_image="https://cdn.britannica.com/09/3809-004-50E1BB9B/Roquefort-cheese.jpg",
        product_image1="https://i0.wp.com/3.bp.blogspot.com/-SoRdsKybX28/TtPnbfV9pzI/AAAAAAAAHfE/tx6bS2n36qw/s1600/IMG_7990.JPG",
        product_image2="chttps://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/5/8/1399567173853/69266628-eedd-41f9-8dda-56a29706e137-2060x1236.jpeg",
        product_image3="https://detoxinista.com/wp-content/uploads/2014/02/pizza1.jpg",
        product_image4="https://laurenslatest.com/wp-content/uploads/2021/07/bacon-blue-cheese-burger-1.jpg"
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
        preview_image="https://cdn.britannica.com/09/3809-004-50E1BB9B/Roquefort-cheese.jpg",
        product_image1="https://www.tastingtable.com/img/gallery/the-mozzarella-cheese-mistake-youre-probably-making-with-pizza/intro-1681497423.jpg",
        product_image2="https://natashaskitchen.com/wp-content/uploads/2023/05/Cheese-Sticks-SQ.jpg",
        product_image3="https://www.cookingclassy.com/wp-content/uploads/2012/12/caprese+grilled+cheese3.jpg",
        product_image4="https://rootsandrefuge.com/wp-content/uploads/2022/01/Mozzarella-Cheese_RR.jpg",
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
        preview_image="https://upload.wikimedia.org/wikipedia/commons/f/f7/Philly_cream_cheese.jpg",
        product_image1="https://palatablepastime.com/wp-content/uploads/2023/04/spreadable-whipped-cream-cheese-for-bagels-sq.jpg",
        product_image2="https://sugarspunrun.com/wp-content/uploads/2018/01/Cream-Cheese-Frosting-Recipe-1-of-1-9.jpg",
        product_image3="https://bakingmischief.com/wp-content/uploads/2022/09/cream-cheese-whipped-cream-image-square.jpg",
        product_image4="https://sugarspunrun.com/wp-content/uploads/2022/08/No-Bake-Cheesecake-1-of-1-2.jpg",
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
        preview_image="https://i5.walmartimages.com/seo/Great-Value-Original-Ricotta-Cheese-15-oz-Refrigerated_833dbb9b-8fd8-4538-a86f-76aed6db343e.ce509fb7a5c093ceb56407bd5419767d.jpeg",
        product_image1="https://www.spendwithpennies.com/wp-content/uploads/2023/09/Homemade-Ricotta-Cheese-SpendWithPennies-204.jpg",
        product_image2="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyW8wJt3rFRFsgq5OHBBkKe_WtvbayB7yh_Q&usqp=CAU",
        product_image3="https://s23209.pcdn.co/wp-content/uploads/2016/11/Sausage-Ricotta-Pepperoni-PizzaIMG_5048edit.jpg",
        product_image4="https://hips.hearstapps.com/hmg-prod/images/delish-20210423-whipped-ricotta-toast-004-ab-1619697056.jpg",
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
        # db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
