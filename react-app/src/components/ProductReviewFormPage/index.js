import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { createReview } from "../../store/products";

import "./CreateReviewForm.css";

function CreateReviewForm() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const member = useSelector((state) => state.session.member); // session.member?

  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [reviewImg, setReviewImg] = useState(null);


  const [submitted, yesSubmitted] = useState(false);
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});


    //id
    //member_id
    //product_id  where to get productId?

    const newReview = {
      memberId: member.id,
      rating,
      headline,
      content,
      reviewImg,
    };

    //what to dispatch
    const res = await dispatch(createReview(newReview));

    if (!res.errors) {
      //proper endpoint to redirect
      // history.push(`/products/${product.id}`);
      yesSubmitted(true);
      reset();
    }

    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });

  };

  const reset = () => {
    setRating(0);
    setHeadline("");
    setContent("");
    setReviewImg("");
  };

  useEffect(() => {
    yesSubmitted(false);
    setErrors({});
  }, [submitted]);


  return (

    <div className="create-review-container">
      <h1>Add a Review</h1>
      <form onSubmit={handleSubmit} className="create-review-field">
        <div>
          <label className="label">Rating</label>
          <input
            type="text"
            placeholder=""
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className=""
          />

          {/* {errors.address && (
            <p style={{ fontSize: "10px", color: "red" }}>*{errors.address}</p>
          )} */}

        </div>

        <div>
          <label className="label">Headline</label>
          <input
            type="text"
            placeholder=""
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Content</label>
          <input
            type="textarea"
            placeholder=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=""
          />
        </div>

        <div>
          <label className="label">Review Image</label>
          <input
            type="file"
            accept="image/*"
            placeholder=""
            value={reviewImg}
            onChange={(e) => setReviewImg(e.target.value)}
            className=""
          />
        </div>

        <div className="create-review-button">
          <button className="submit">Add Review</button>
        </div>
      </form>
    </div>

  );
}

export default CreateReviewForm;
