import React from "react";
import { useState } from "react";
import './StarRating.css'


function StarRating({ rating, setRating }) {
    const MAX_RATING = 5;
    const [hover, setHover] = useState(null);
  
    const handleClick = (value) => {
      setRating(value);
    };
  
    return (
        <div className="star-rating">
      {[...Array(MAX_RATING)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            onClick={() => setRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: 'pointer', fontSize: '54px' }}
          >
            {ratingValue <= (hover || rating) ? "🧀" : "🕳️"}
          </span>
        );
      })}
    </div>
    );
  }

    export default StarRating;
