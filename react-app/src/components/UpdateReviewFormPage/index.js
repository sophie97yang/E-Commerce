import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { editReview,getAllProducts } from "../../store/products";
import { useModal } from "../../context/Modal";


export function UpdateReviewForm({review}) {
const dispatch = useDispatch();
const history = useHistory();
const member = useSelector((state) => state.session.member);

const [rating, setRating] = useState(review ? review.rating : 0)
const [headline, setHeadline] = useState(review ? review.headline : "")
const [content, setContent] = useState(review ? review.content : "");

const [submitted, yesSubmitted] = useState(false)
const [errors, setErrors] = useState({})
const [disabled,setDisabled] = useState(true)

const {closeModal} = useModal();


useEffect(()=> {
    dispatch(getAllProducts()).catch(res => res)
  },[dispatch])


  useEffect(()=> {
    if (!headline || !content) setDisabled(true);
    else setDisabled(false);
  },[headline,content])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();

    // formData.append("review_image", review_image);
    formData.append("product_id", parseInt(review.product_id));
    formData.append("rating", rating);
    formData.append("headline", headline);
    formData.append("content", content);
    formData.append("member_id", member.id);

    const res = await dispatch(editReview(formData, review.id));

    if (!res.errors) {
      dispatch(getAllProducts());
      history.push(`/products/${review.product_id}`);
      closeModal();
      yesSubmitted(true);
      reset();
    } else {
      setErrors(res.errors)
    }


  };

  const reset = () => {
    setRating(0);
    setHeadline("");
    setContent("");
  };

  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
  }, [submitted]);


return (
    <div className="create-review-container">
      
      <form onSubmit={handleSubmit}
      className="create-review-field"
        encType="multipart/form-data"
        >
        <div>
        <h1>Update Your Review</h1>
          <label className="label">Rating</label>
          <input
            type="text"
            placeholder=""
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="review-rating-input"
          />

          {errors.rating && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.rating[0]}</p>
          )}


        </div>

        <div>
          <label className="label">Headline</label>
          <input
            type="text"
            placeholder=""
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="review-input"
          />

          {errors.headline && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.headline[0]}</p>
          )}
        </div>

        <div>
          <label className="label">Content</label>
          <textarea
            placeholder=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="review-input review-content-input"
          />
        </div>

        {errors.content && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.content[0]}</p>
          )}


        {/* <div>
          <label className="label">Review Image</label>
          <input
            type="file"
            accept="image/*"
            placeholder=""
            onChange={(e) => setReviewImg(e.target.files[0])}
            className=""
          />

        {errors.review_image && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.review_image[0]}</p>
          )}
        </div> */}

        <div className="create-review-button">
          <button type="submit" disabled={disabled}>Update Review</button>
        </div>
      </form>
    </div>
  );

}

export default UpdateReviewForm
