import OpenModalButton from "../../OpenModalButton";
import DeleteReview from "../../DeleteReview";
import UpdateReviewForm from "../../UpdateReviewFormPage";
import './ManageReview.css';

const ManageReview = ({ review }) => {

    return (
        <>
            <div className="manage-review-container">
                <div className="manage-review-inner-container">

                    <h1 className="manage-header">Manage Review</h1>

                    <OpenModalButton className="update-review-button" modalComponent={<UpdateReviewForm review={review} />} buttonText={"Edit Review"} />

                    <OpenModalButton className="delete-review-button" buttonText="Delete Review" modalComponent={<DeleteReview title="Delete Review" review={review} />} />

                </div>
            </div>

        </>
    )
}

export default ManageReview
