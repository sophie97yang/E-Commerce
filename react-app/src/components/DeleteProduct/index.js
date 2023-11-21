import React from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../store/products';

const DeleteProduct = ({ productId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    // Confirm with the user before deletion
    if(window.confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProduct(productId));
    }
  };

  return (
    <button onClick={handleDelete}>Delete Product</button>
  );
};

export default DeleteProduct;
