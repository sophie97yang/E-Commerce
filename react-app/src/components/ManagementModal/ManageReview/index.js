import OpenModalButton from "../../OpenModalButton";
import DeleteReview from "../../DeleteReview";
import UpdateReviewForm from "../../UpdateReviewFormPage";
import { useModal } from "../../../context/Modal";
import './ManageReview.css';

const ManageReview = ({ review }) => {
    const {closeModal} = useModal();

    return (
        <>
            <div className="manage-review-container">
                <div className="manage-review-inner-container">
                <button onClick={closeModal} className='close-modal' id='close-modal-review'><i className="fa-solid fa-xmark fa-lg"></i></button>
                    <h1 className="manage-header">Manage Review</h1>

                    <OpenModalButton className="update-review-button" modalComponent={<UpdateReviewForm review={review} modal={true}/>} buttonText={"Edit Review"} />

                    <OpenModalButton className="delete-review-button" buttonText="Delete Review" modalComponent={<DeleteReview title="Delete Review" review={review} />} />

                </div>
            </div>

        </>
    )
}

export default ManageReview
