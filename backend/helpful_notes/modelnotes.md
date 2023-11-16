# RELATIONSHIPS

## One to Many
- member -> reviews
- member -> shopping_carts
- product -> product_images
- review -> review_images


## Many to Many
- shopping_carts -> JOIN order_details -> products
- members -> JOIN wishlists -> products
