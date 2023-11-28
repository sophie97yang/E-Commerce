import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import OpenModalButton from "../OpenModalButton";

const DeleteProduct = ({ product }) => {
  const member = useSelector(state => state.session.member);

  // Check if the logged-in member is the seller of the product
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (member && product.seller.id === member.id) {
      setHidden(false);
    }
  }, [member, product]);

  return (
    <OpenModalButton
    modalComponent={<ConfirmDeleteModal product={product} />}
    buttonText="Delete Product"
    className={hidden ? "delete_product_button_hidden": "delete_product_button"}
  />
  );
};

export default DeleteProduct;
