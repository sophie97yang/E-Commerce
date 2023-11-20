import React from 'react';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Wishlist() {

  const handleRemoveFromWishlist = (productId) => {
      axios.delete(`/api/wishlist/remove/${productId}`)
        .then(() => {
          // Update the wishlistItems state to remove the item
          setWishlistItems(currentItems => currentItems.filter(item => item.id !== productId));
        })
        .catch(error => console.error('Error removing item from wishlist:', error));
  };
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

  return (
    <div>
      <h2>Wishlist</h2>
      {wishlistItems.map(item => (
          <div key={item.id} className='wishlist-item'>
            <h3>{item.name}</h3>
            {/* Add more product details as needed */}
            <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
          </div>
      ))}
    </div>
  );
}

//header/footer needs to be added

//to be used on other components:

//   const handleAddToWishlist = (productId) => {
//       axios.post(`/api/wishlist/add/${productId}`)
//         .then(() => {
//         })
//         .catch(error => console.error('Error adding item to wishlist:', error));
//   };

export default Wishlist;

