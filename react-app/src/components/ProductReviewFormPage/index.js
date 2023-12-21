import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createReview,getAllProducts } from "../../store/products";
import "./CreateReviewForm.css";
import critic from '../../assets/images/critic.png'
import StarRating from './StarRating';

function CreateReviewForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const member = useSelector((state) => state.session.member); // session.member?
  const products = useSelector((state) => state.session.products);
  const {id}= useParams();

  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [review_image, setReviewImg] = useState(null);

  const [imageLoading, setImageLoading] = useState(false);

  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [disabled,setDisabled] = useState(true);

  useEffect(()=> {
    dispatch(getAllProducts()).catch(res => res)
  },[dispatch])

  useEffect(()=> {
    if (!headline || !content || !review_image) setDisabled(true);
    else setDisabled(false);
  },[headline,content,review_image])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();

    formData.append("review_image", review_image);
    formData.append("product_id", parseInt(id));
    formData.append("rating", rating);
    formData.append("headline", headline);
    formData.append("content", content);
    formData.append("member_id", member.id);

    setImageLoading(true);

    const res = await dispatch(createReview(formData, parseInt(id)));

    setImageLoading(false);

    if (!res.errors) {
      history.push(`/products/${id}`);
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
    setReviewImg(null);
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
        <h1 className="h1Review">Add a Review</h1>
        <img src={critic} alt='critic' className="remy"></img>
          {/* <label className="label">Rating</label>
          <input
            type="text"
            placeholder=""
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="review-rating-input"
          />

          {errors.rating && (∂
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.rating[0]}</p>
          )} */}
<label className="label">Rating</label>
          <StarRating rating={rating} setRating={setRating} />
          {errors.rating && <p style={{ fontSize: "10px", color: "red" }}>*{errors.rating[0]}</p>}

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


        <div>
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
        </div>

        <div className="create-review-button">
          <button type="submit" disabled={disabled}>Add Review</button>

          {(imageLoading)&& <p>Loading...</p>}
        </div>
      </form>
    </div>
  );
}

export default CreateReviewForm;
