import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../../store/products';
import {useHistory} from 'react-router-dom'

const DeleteProduct = ({ product }) => {
  const member = useSelector(state => state.session.member);
  const dispatch = useDispatch();
  const history = useHistory();

  // Check if the logged-in member is the seller of the product
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (member && product.seller === member.id) {
      setHidden(false);
    }
  }, [member, product]);

  const handleDelete = (e) => {
    e.preventDefault();
    // Confirm with the user before deletion
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(removeProduct(product.id));
      history.push('/products')
    }

  };

  return (
    <button onClick={handleDelete} hidden={hidden}>
      Delete Product
    </button>
  );
};

export default DeleteProduct;
