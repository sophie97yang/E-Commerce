import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Wishlist.css';


function Wishlist({ handleAddToCart }) {

  const [wishlistItems, setWishlistItems] = useState([]);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user) {
      axios.get('/api/wishlist/current')
        .then(response => {
          setWishlistItems(response.data.wishlist);
        })
        .catch(error => console.error('Error fetching wishlist:', error));
    }
  }, [user]);

  const handleRemoveFromWishlist = (productId) => {
      axios.delete(`/api/wishlist/remove/${productId}`)
        .then(() => {
          // Update the wishlistItems state to remove the item
          setWishlistItems(currentItems => currentItems.filter(item => item.id !== productId));
        })
        .catch(error => console.error('Error removing item from wishlist:', error));
  };

  const handleMoveToCart = (productId) => {
    // This function would remove the product from the wishlist and add it to the cart
    handleAddToCart(productId);
    handleRemoveFromWishlist(productId);
  };

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlistItems.map(item => (
        <div key={item.id} className='wishlist-item'>
          <h3>{item.name}</h3>
          <p>{item.description}</p> {/* Assuming the item has a description */}
          {/* Add more product details as needed */}
          <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
          <button onClick={() => handleMoveToCart(item.id)}>Add to Shopping Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
