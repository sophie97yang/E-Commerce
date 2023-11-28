import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addOrder,editOrder,authenticate, removeFromWishlist} from '../../store/session';
import productsReducer from '../../store/products';
import './Wishlist.css';
import { Link } from 'react-router-dom';


function Wishlist() {
  const member = useSelector(state => state.session.member);
  const history = useHistory();
  const dispatch = useDispatch();


  const wishlistItems = member?.products

  const AddToCart = async (item) => {
    const shopping_cart = member.orders.filter(order=> order.purchased===false)[0]
    if (!shopping_cart) {
      const res = await dispatch(addOrder(1,item.id)).then(dispatch(removeFromWishlist(item.id))).catch(res => res);
      if (!res.errors) {
        dispatch(authenticate())
        history.push('/orders')
      }
    } else {
      const res = await dispatch(editOrder(1,item.id)).then(dispatch(removeFromWishlist(item.id))).catch(res => res);
      if (!res.errors) {
        dispatch(authenticate())
        history.push('/orders')
      }
    }
  }

  const RemoveFromWishlist = async (item) => {
    const res = await dispatch(removeFromWishlist(item.id)).catch(res=>res);
    if (!res.errors) {
      dispatch(authenticate())
      history.push('/orders')
    } else {
      console.log(res.errors);
    }
  }

  return (
    <>

      <h2 className="wishlist-title">Wishlist</h2>
      <p className="wishlist-subtitle">Let people know what gifts you'd like.  Save time.  Add your items and ideas in one convenient location.</p>

    <div className="wishlist-container">
      <div className="wishlist-items">

        {wishlistItems?.length > 0 ? (
          wishlistItems?.map(item => (
            <div key={item.id} className='wishlist-item'>
              <Link
            to={`/products/${item.id}`}
            className="product-name-link"
          >
              <h3 className="wishlist-item-name">{item.name}</h3>

              </Link>

              <div className="wishlist-item-description">{item.description}</div>


            <div className="wishlist-img-container">
            <Link
            to={`/products/${item.id}`}
            className="product-name-link"
          >
            <img className="wishlist-img" src={item.preview_image}/>
            </Link>
            </div>

              <div className="wishlist-button-divider"></div>
              <button onClick={() => RemoveFromWishlist(item)}>
                Remove from Wishlist
              </button>
              {item.available ? <button onClick={()=> AddToCart(item)}>
                Add to Shopping Cart
              </button> : <button disabled={true} id='disabled_button'>
                Add to Shopping Cart
              </button>}



            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Wishlist;
