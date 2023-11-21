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
                    src={product.preview_image}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image1 ? product.product_image1 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image2 ? product.product_image2 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image3 ? product.product_image3 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
                    alt="product"
                  />
                </div>
                <div>
                  <img
                    className="product-img"
                    src={product.product_image4 ? product.product_image4 : 'https://karinedeli.com/wp-content/uploads/2021/12/image-coming-soon.jpg'}
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
