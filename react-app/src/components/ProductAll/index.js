import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import { getAllProducts } from "../../store/products";
import { addOrder,authenticate,editOrder, removeFromWishlist,addToWishlist, deleteCart, deleteFromCart } from "../../store/session";
import { Link } from "react-router-dom";
import './ProductAll.css';
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";


const ProductAll = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const productsObj = useSelector((state) => state.products.products);
    const productList = productsObj ? Object.values(productsObj) : [];
    const member = useSelector(state => state.session.member)


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);



    if (!productList) {
        return null
    }

  //refactor product name to capitalize first letter and price display
  //refactor to include review stars inside product object!
  productList.forEach(product => {
    product.name = product.name[0].toUpperCase()+product.name.slice(1);
    const product_price_split = product.price.toString().split('.')[1];
    if (!product_price_split) {
      product.price = product.price.toString()+".00"
    }
    if (product.rating_sum) {
      const product_average_rating = Math.floor(product.rating_sum/product.reviews.length);
      product.average_rating=''
      for (let i=0;i<product_average_rating;i++) {
        product.average_rating+='★'
      }
    }
  })

  //handle Add Cart Callback
  const handleAddCart = async (productId) => {
    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }
    const shopping_cart = member.orders.filter(order=> order.purchased===false)[0];

    if (!shopping_cart) {
      const res = await dispatch(addOrder(1,productId));
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
        for (let i=0; i<wishlist.length;i++) {
          if (wishlist[i].id===productId) {
            const res = await dispatch(removeFromWishlist(productId));
            if (!res.errors) break;
            else {
              console.log(res);
              break;
            }
          }
        }}
        dispatch(authenticate())
        alert('Successfully added to cart')
      }
    } else {
      const res = await dispatch(editOrder(1,productId));
      // dispatch(getAllProducts())
      if (!res.errors) {
          //check wishlist and delete product from wishlist if item is added to shopping cart
          const wishlist = member.products;
          if (wishlist) {
          for (let i=0; i<wishlist.length;i++) {
            if (wishlist[i].id===productId) {
              const res = await dispatch(removeFromWishlist(productId));
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }}
        dispatch(authenticate())
        alert('Successfully added to cart')
      }
    }

  }

    return (
        <main>
            <div>
                <h1>Products</h1>
            </div>



            <div className="product-square">
  <div className="product-left">
    <div className="product-left-inner-square">
      <h1>Get your holiday gifts on time.</h1>
      {/* <img className="product-left-inner-truck" src={} alt="img"/> */}
    </div>
    <div className="product-left-inner-square2">
      <h1>Filter</h1>
      {/* <img className="product-left-inner-truck" src={} alt="img"/> */}
    </div>
  </div>

  <div className="product-right">
    <div className="product-right-inner-square">
      <h1>Cheese Collection</h1>
      {/* <img className="product-left-inner-truck" src={} alt="img"/> */}
    </div>

    <ul className="products-list">
      {productList.length &&
        productList.map((product) => (
          <div key={product.id} title={product.name} className={!product.available ? 'product_hidden': ''}>
            <Link to={`/products/${product.id}`}>
              <div>
                <img src={product.preview_image} alt="product" className="product-img" />
              </div>
              <div>
                <li>{product.name}</li>
                <li>${product.price}</li>
                <li>{product.rating_sum ? `${product.average_rating} ${product.reviews.length}` : "No Reviews Yet"}</li>
              </div>
            </Link>
            <button onClick={()=>{handleAddCart(product.id)}}>Add to Cart</button>
          </div>
        ))}
    </ul>
    {member && member.seller ? <button onClick={
      (e) => {
        e.preventDefault();
        history.push('/products/new');
      }
    }> Add a Product</button> : ""}
  </div>
</div>




        </main>
    );
};

export default ProductAll;
