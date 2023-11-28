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
        product_image2="https://static01.nyt.com/images/2021/11/10/dining/08BurnerBlue/08BurnerBlue-superJumbo.jpg",
        product_image3="https://maytagdairyfarms.com/images/made/uploads/images/_safe/Maytag2020-1390_480_480_60_c1.jpg",
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
        preview_image="https://images.immediate.co.uk/production/volatile/sites/30/2021/09/Homemade-mozzarella-054151d.jpg",
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

    product8 = Product(
        name= "Swiss Cheese",
        seller=1,
        description= "This iconic, hole-filled cow's milk cheese originated in Switzerland, but is made worldwide. Common varieties include gruyere, a firm yellow variety, and raclette, a famous melted cheese.",
        price= 6.99,
        category= "Washed Rind",
        origin_city="Lush Valley",
        origin_state="Switzerland",
        available=20,
        preview_image="https://www.tastingtable.com/img/gallery/the-origins-of-swiss-cheese/l-intro-1667250377.jpg",
        product_image1="https://www.mashed.com/img/gallery/what-you-didnt-know-about-emmental-cheese/l-intro-1615051482.jpg",
        product_image2="https://somethingaboutsandwiches.com/wp-content/uploads/2022/06/classic-cheese-sandwich.jpg",
        product_image3="https://www.mashed.com/img/gallery/swiss-cheeses-trademark-holes-are-caused-by-bacteria/l-intro-1676998215.jpg",
        product_image4="https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/a39982a226e218f5a5e27d402fe976cc.jpg",
        )


    product9 = Product(
        name= "Meunster Cheese",
        seller=2,
        description= "Muenster is most recognizable by its orange exterior that comes from a vegetable coloring added during the cheesemaking process. The flavor is mild and creamy and the texture is soft. Try it melted on a burger or in mac and cheese.",
        price= 5.95,
        category= "Washed Rind",
        origin_city="Alsace",
        origin_state="France",
        available=15,
        preview_image="https://blog.wisconsincheeseman.com/wp-content/uploads/sites/10/2016/08/muenster-cheese_large-1.jpg",
        product_image1="https://pearlvalleycheese.com/cdn/shop/products/muenster-cheese_800x.jpg?v=1676473673",
        product_image2="https://colosse.com/wp-content/uploads/2016/03/muenster-stock.jpg",
        product_image3="https://store.pagelsponderosa.com/wp-content/uploads/2020/08/Muenster-Block-resized-scaled.jpg",
        product_image4="https://cdn11.bigcommerce.com/s-2jk2gbnnuz/images/stencil/1280x1280/products/157/387/muenster_IMG_2058__46290.1546969091.jpg?c=2",
        )


    product10 = Product(
        name= "Meunster Cheese",
        seller=3,
        description= "Havarti cheese is a semi-soft Danish cheese that is known for its creamy texture and mild, buttery flavor. It has small, irregular openings or eyes throughout the cheese, and its texture can range from smooth to slightly crumbly depending on the variety. Havarti is often enjoyed as a table cheese, sandwich cheese, or used in various culinary applications.",
        price= 7.95,
        category= "Washed Rind",
        origin_city="Havarthigaard",
        origin_state="Denmark",
        available=20,
        preview_image="https://frankenmuthcheesehaus.com/cdn/shop/files/HavartiHerbsandSpices1090_934x700.jpg?v=1682553006",
        product_image1="https://fromagination.com/wp-content/uploads/2023/10/Roth-Dill-Havarti.a.650x464.72res.jpg",
        product_image2="https://www.piast.com/cdn/shop/products/HavartiCheese_1245x700.jpg?v=1609931934",
        product_image3="https://blog.wisconsincheeseman.com/wp-content/uploads/sites/10/2019/08/Dill-Havarti-Cheese.jpg",
        product_image4="https://www.gourmetdash.com/media/catalog/product/cache/ea731b03951ff39bad0cb0d9b1c0aab7/8/4/84951_beauty.jpg",
        )


    product11 = Product(
        name= "Manchego Cheese",
        seller=4,
        description= "Manchego cheese is a Spanish cheese made from sheep's milk. It is known for its distinctive flavor, which can range from mild to sharp, depending on the age of the cheese. Manchego has a firm and compact texture, often with a natural, rustic rind and a characteristic herringbone pattern on its outer surface. The flavor profile is nutty and savory, and the cheese is typically enjoyed on its own or paired with fruits, nuts, or cured meats.",
        price= 10.95,
        category= "Fresh",
        origin_city="Ciudad Real",
        origin_state="Castilla-La Mancha",
        available=15,
        preview_image="https://static1.squarespace.com/static/618065e699b2e81184903ab8/61806ded74eff137c7f77f7f/6248e0d0e1ebac5406752dc1/1648943315842/manchego-cailloux.jpeg?format=1500w",
        product_image1="https://images.squarespace-cdn.com/content/v1/57fe97c29f745672be3b24d0/1588540319908-ZQPGA9EKXC5BSP59M1IG/4.jpg?format=1500w",
        product_image2="https://www.gourmetfoodstore.com/images/Product/large/merco-manchego-aged-6-months-12738-1S-2738.jpg",
        product_image3="https://www.cheesehouse.com/wp-content/uploads/1970/01/Manchego-005.jpg",
        product_image4="https://pastaonthefloor.com/wp-content/uploads/2023/03/POTF-Manchego-e1678833310527.jpg",
        )



    product12 = Product(
        name= "Feta Cheese",
        seller=2,
        description= "Feta cheese is a crumbly and tangy cheese that originated in Greece. It is traditionally made from sheep's milk, although goat's milk or a combination of the two may also be used. Feta has a salty and briny flavor, and its texture can range from creamy to crumbly. It is a versatile cheese often used in salads, pastries, and various Mediterranean dishes.",
        price= 8.99,
        category= "Fresh",
        origin_city="Athens",
        origin_state="Greece",
        available=9,
        preview_image="https://larderlove.com/wp-content/uploads/2017/10/homemade-feta-1-larderlove.com_.jpg",
        product_image1="https://lovingitvegan.com/wp-content/uploads/2022/12/Vegan-Feta-Square-4.jpg",
        product_image2="https://itdoesnttastelikechicken.com/wp-content/uploads/2023/04/the-best-vegan-feta-recipe-cashew-almond-no-tofu-04.jpg",
        product_image3="https://cheesemaking.com/cdn/shop/products/Feta_hero_grande.jpg?v=1529434179",
        product_image4="https://myquietkitchen.com/wp-content/uploads/2021/04/Vegan-Feta-Cheese-Oil-Free.jpg",
        )


    product13 = Product(
        name= "Grana Padano",
        seller=1,
        description= "Grana Padano is a hard and granular Italian cheese with a rich, nutty flavor. Its production follows specific guidelines to ensure authenticity. Grana Padano is similar to Parmigiano-Reggiano but is produced in a broader geographical area. The cheese has a firm texture, a pale yellow color, and a complex, savory taste. It is often grated and used as a topping for various dishes.",
        price= 13.99,
        category= "Bloomy Rind",
        origin_city="Po River Valley",
        origin_state="Northern Italy",
        available=16,
        preview_image="https://images.squarespace-cdn.com/content/v1/5eb43938f468c330e7d8d665/1600730128154-ZHN4N5CAGI5NPBPWYMLD/grana+Giant+wedge.jpg?format=1000w",
        product_image1="https://hips.hearstapps.com/hmg-prod/images/lede1-1606289363.jpg",
        product_image2="https://m.media-amazon.com/images/I/41iCnMYSw5L._AC_UF894,1000_QL80_.jpg",
        product_image3="https://frankandsal.com/cdn/shop/products/italian-cheese-buy-grana-padano-aged-over-18-months-shipped-free-1_600x.png?v=1551200458",
        product_image4="https://www.zabars.com/dw/image/v2/BKDS_PRD/on/demandware.static/-/Sites-zabars-master-catalog/default/dwd5133296/images/zabars_5110093.jpg?sw=1280",
        )



    product14 = Product(
        name= "Pecorino Romano",
        seller=4,
        description= "Pecorino Romano is a hard and salty Italian cheese made from sheep's milk. Known for its robust and savory flavor, Pecorino Romano has a crumbly texture and is often grated or shaved to enhance dishes with its distinctive taste.",
        price= 10.95,
        category= "Bloomy Rind",
        origin_city="Lazio",
        origin_state="Rome",
        available=16,
        preview_image="https://www.thespruceeats.com/thmb/hGXjdSeq5X5A4XUpLE6DuJzfrNc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/scavato-vertic_per-sito-584192385f9b5851e5fb4c4b.jpg",
        product_image1="https://www.cheese.com/media/img/cheese/Pecorino_romano_cheese.jpg",
        product_image2="https://www.eataly.com/media/catalog/product/3/1/31335_pecorino_romano_dop_1.jpg",
        product_image3="https://www.thecheeseguy.com/uploads/7/9/9/8/79986520/pecorino-romano-3-tableau_1.jpg",
        product_image4="https://www.italiaregina.it/wp-content/uploads/2022/01/Copy-of-Products-Post-Twitter-Post-5.png",
        )



    product15 = Product(
        name= "Fontina Cheese",
        seller=8,
        description= "Fontina cheese is a semi-soft, cow's milk cheese.  Recognized for its creamy texture and rich, nutty flavor, Fontina is a versatile cheese that can be enjoyed on its own or used in a variety of culinary applications.",
        price= 8.95,
        category= "Bloomy Rind",
        origin_city="Aosta Valley",
        origin_state="Northern Italy",
        available=25,
        preview_image="https://carrvalleycheese.com/wp-content/uploads/2019/04/FontinaImage-578.jpg",
        product_image1="https://rms.condenast.it/rms/public/5d8/4cf/a1d/thumb_4119_1200_670_0_0_auto.jpg",
        product_image2="https://www.westbycreamery.com/wp-content/uploads/2022/11/westby-ccoperative-creamery-sartori-wedge-classic-fontina-1200x900.jpeg",
        product_image3="https://apostofoods.com/cdn/shop/products/186100_1200x1200.jpg?v=1607466913",
        product_image4="https://muscofood.com/wp-content/uploads/2019/01/36S032-655x561.jpg",
        )



    # images = [image1,image2,image3,image4,image5,image6,image7]
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    # add_images = [db.session.add(image) for image in images]

    db.session.commit()

    print("Successful CHEESY Products completed!!!!!")

    return [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10, product11, product12, product13, product14, product15]


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM products"))
        # db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
