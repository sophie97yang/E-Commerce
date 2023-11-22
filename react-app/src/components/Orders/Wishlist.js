import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {addOrder,editOrder,authenticate, removeFromWishlist} from '../../store/session';
// import './Wishlist.css';

function Wishlist() {
  const member = useSelector(state => state.session.member);
  const history = useHistory();
  const dispatch = useDispatch();


  const wishlistItems = member?.products

  const AddToCart = async (item) => {
    if (!member) {
      history.push('/login')
      return ['Forbidden'];
    }

    const shopping_cart = member.orders.filter(order=> order.purchased===false)[0]
    if (!shopping_cart) {
      const res = await dispatch(addOrder(1,item.id)).then(()=>{dispatch(removeFromWishlist(item.id))}).catch(res => res);
      if (!res.errors) {
        dispatch(authenticate())
        alert('Successfully added to cart')
        history.push('/orders')
      }
    } else {
      const res = await dispatch(editOrder(1,item.id)).then(()=>dispatch(removeFromWishlist(item.id))).catch(res => res);
      if (!res.errors) {
        dispatch(authenticate())
        alert('Successfully added to cart')
        history.push('/orders')
      }
    }
  }

  return (
    <div className="wishlist-container">
      <h2>Wishlist</h2>
      <div className="wishlist-items">
        {wishlistItems?.length > 0 ? (
          wishlistItems?.map(item => (
            <div key={item.id} className='wishlist-item'>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button>
              {/* onClick={() => handleRemoveFromWishlist(item.id)} */}
                Remove from Wishlist
              </button>
              <button onClick={()=> AddToCart(item)}>
                Add to Shopping Cart
              </button>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Wishlist;


  // useEffect(() => {
  //   if (!user) {
  //     history.push('/products'); // Redirect unauthenticated users to products page if they are not logged in
  //     return;
  //   }

  //   setLoading(true);
  //   fetch('/api/wishlist/current', {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     setWishlistItems(data.wishlist);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching wishlist:', error);
  //     setError('Failed to fetch wishlist. Please try again later.');
  //   })
  //   .finally(() => setLoading(false));
  // }, [user, history]);

  // const handleRemoveFromWishlist = (productId) => {
  //   fetch(`/api/wishlist/remove/${productId}`, {
  //     method: 'DELETE',
  //     credentials: 'include',
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to remove item from wishlist');
  //     }
  //     setWishlistItems(currentItems => currentItems.filter(item => item.id !== productId));
  //   })
  //   .catch(error => {
  //     console.error('Error removing item from wishlist:', error);
  //     setError('Failed to remove item from wishlist.');
  //   });
  // };

  // if (loading) {
  //   return <p>Loading wishlist...</p>;
  // }
