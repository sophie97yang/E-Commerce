import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import { getAllProducts } from "../../store/products";
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
          <div key={product.id} title={product.name}>
            <Link to={`/products/${product.id}`}>
              <div>
                <img src={product.preview_image} alt="product" className="product-img" />
              </div>
              <div>
                <li>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.reviews?.rating}</li>
                <li>{product.rating_sum ? `Average Rating:${(product.rating_sum/product.reviews.length).toString().slice(0,4)}` : "No Reviews Yet"}</li>
              </div>
            </Link>
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
