import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getAllProducts } from "../../store/products";
import { addOrder, authenticate, editOrder, removeFromWishlist, addToWishlist, deleteCart, deleteFromCart } from "../../store/session";
import { Link } from "react-router-dom";
import './ProductAll.css';
import truckImg from '../../assets/images/truckIcon.jpg';
import memory from '../../assets/images/charcuterie.jpeg';

const ProductAll = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productsObj = useSelector((state) => state.products.products);
  let productList = productsObj ? Object.values(productsObj) : [];
  const member = useSelector(state => state.session.member);
  const [toggleInStock,setToggle] = useState(false);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(()=> {
    if (toggleInStock) {
      productList = productList.filter(product=>product.available)
      console.log(productList)
    }
  },[toggleInStock])

  if (!productList) {
    return null
  }

  //refactor product name to capitalize first letter and price display
  //refactor to include review stars inside product object!
  productList.forEach(product => {
    if (product) {
      product.name = product.name[0].toUpperCase() + product.name.slice(1);
      const product_price_split = product.price.toString().split('.')[1];
      if (!product_price_split) {
        product.price = product.price.toString() + ".00"
      }
      else if (product_price_split.toString().length!=2) {
        product.price = product.price.toString() + "0"
      }
      if (product.rating_sum) {
        const product_average_rating = Math.floor(product.rating_sum / product.reviews.length);
        product.average_rating = ''
        for (let i = 0; i < product_average_rating; i++) {
          product.average_rating += '★'
        }
      }
    }
  })



  //handle Add Cart Callback
  const handleAddCart = async (productId) => {
    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }
    const shopping_cart = member.orders.filter(order => order.purchased === false)[0];

    if (!shopping_cart) {
      const res = await dispatch(addOrder(1, productId));
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === productId) {
              const res = await dispatch(removeFromWishlist(productId));
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }
        }
        dispatch(authenticate());
        history.push('/orders')
      }
    } else {
      const res = await dispatch(editOrder(1, productId));
      // dispatch(getAllProducts())
      if (!res.errors) {
        //check wishlist and delete product from wishlist if item is added to shopping cart
        const wishlist = member.products;
        if (wishlist) {
          for (let i = 0; i < wishlist.length; i++) {
            if (wishlist[i].id === productId) {
              const res = await dispatch(removeFromWishlist(productId));
              if (!res.errors) break;
              else {
                console.log(res);
                break;
              }
            }
          }
        }
        dispatch(authenticate())
        history.push('/orders')
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
          <div className="product-left-outer-square">
            <div className="product-left-inner-square">
              <h1>Get your holiday gifts on time.</h1>
              <div className="image-product">
                <img className="truck" src={truckImg} alt="truck" />
              </div>
            </div>
            <div className="product-left-inner-square">
              <h1>Create memories with every purchase</h1>
              <div className="image-product">
                <img className="memory" src={memory} alt="memory" />
              </div>
            </div>
          </div>
        </div>

        <div className="product-right">
          <div className="product-right-inner-square">
            <h1>Cheese Collection</h1>
            <label>In Stock Only
            <input
                type='checkbox'
                value={toggleInStock}
                onChange={(e)=> {
                  e.preventDefault();
                  setToggle(e.target.value)
                  console.log(toggleInStock);
                }}
            />
            </label>
          </div>
          {member && member.seller ? <button onClick={
            (e) => {
              e.preventDefault();
              history.push('/products/new');
            }
          }> Add a Product</button> : ""}



          <ul className="products-list">
            {productList.length &&
              productList.map((product) => (
                <div key={product.id} title={product.name} className={!product.available ? 'product_hidden' : ''}>
                  <div className="product-ind-box">
                    <Link to={`/products/${product.id}`}>
                      <div>
                        <img src={product.preview_image} alt="product" className="product-img" />
                      </div>
                      <div className="product-summary">
                        <li>{product.name}</li>
                        <li>${product.price}</li>
                        <li>{product.rating_sum ? `${product.average_rating} ${product.reviews.length}` : "No Reviews Yet"}</li>
                      </div>
                    </Link>
                    {product.available ? <div>{!member || !(member?.seller && product.seller.id === member.id) ? <button onClick={() => { handleAddCart(product.id) }}>Add to Cart</button> : <></>}</div> : <div className='out-of-stock'><p>Out of Stock</p></div>}
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>




    </main>
  );
};

export default ProductAll;
