import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/products';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import '../DeleteProduct/DeleteProduct.css'


const DeleteReview = ({ review }) => {
  const member = useSelector(state => state.session.member)
  const dispatch = useDispatch();
//check if member is reviewer
  const history = useHistory();
  const {closeModal} = useModal();



  const handleDelete = async (e) => {
    e.preventDefault();
      dispatch(deleteReview(review.product_id,review.id)).catch(res => res).then(closeModal);
    }

  return (
    <div className='delete-modal'>
      <button onClick={closeModal} className='close-modal' id='close-modal-delete-review'><i className="fa-solid fa-xmark fa-lg"></i></button>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review? This action cannot be undone.</p>
      <button onClick={handleDelete} className="delete-review-button">Yes,delete my review.</button>
      <button onClick={closeModal} className="delete-review-button">No, keep my review.</button>
    </div>
  );
};

export default DeleteReview;
