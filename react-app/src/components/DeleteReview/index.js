import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/products';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const DeleteReview = ({ review }) => {
  const member = useSelector(state => state.session.member)
  const dispatch = useDispatch();
//check if member is reviewer
  const [hidden, setHidden] = useState(true)
  const history = useHistory();

  useEffect(()=> {
    if (member && member.id == review.member.id){
      setHidden(false)
    }
  },[member])


  const handleDelete = async (e) => {
    e.preventDefault();
    // Confirm with the user before deletion
    if(window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(review.product_id,review.id)).catch(res => console.log(res));

    }
  };

  return (
    <div>
      <button onClick={handleDelete} className="delete-review-button" hidden={hidden}>Delete Review</button>
    </div>
  );
};

export default DeleteReview;
