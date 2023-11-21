import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/products";
import './ProductDetails.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products)

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  if (!products) return null;
  const product = products[id];

  return (
    <>
      <div>

        {!product ? (
          <div>Loading...</div>
        ) : (
          <div className="product-content">
            <div className="product-images-box">
              <Carousel className="Carousel-img">
              <div>
                  <img
                    className="product-img"
                    src={product.preview_img}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_img1}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_img2}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_img3}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_img4}
                    alt="product"
                  />
                </div>
              </Carousel>
            </div>
            <div className="test">
              <div className="product-details">
                <div>{product.name}</div>
                <div>Category: {product.category}</div>
                <div>Description: {product.description}</div>
                <div>Availability: {product.available}</div>
                <div>${product.price}</div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default ProductDetails;
