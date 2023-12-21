import React from 'react';
import './RatingDistribution.css';

const RatingDistribution = ({ ratings }) => {
  // Check if ratings is available
  if (!ratings) {
    return <div>No ratings yet</div>; 
  }

//   const totalReviews = ratings.reduce((acc, curr) => acc + curr.count, 0);

//   return (
//     <div>
//       {ratings.map((rating, index) => (
//         <div key={index}>
//           <span>{rating.stars} stars</span>
//           <progress className="progress-bar" value={rating.count} max={totalReviews}></progress>
//           <span>{((rating.count / totalReviews) * 100).toFixed(2)}%</span>
//         </div>
//       ))}
//     </div>
//   );
// };

const totalReviews = ratings.reduce((acc, curr) => acc + curr.count, 0);

return (
  <div>
    {ratings.map((rating, index) => {
      // Calculate the percentage
      const percentage = totalReviews > 0 ? ((rating.count / totalReviews) * 100).toFixed(2) : "0.00";
      
      return (
        <div key={index}>
          <span>{rating.stars} stars</span>
          <progress className="progress-bar" value={rating.count} max={totalReviews}></progress>
          <span>{percentage}%</span>
        </div>
      );
    })}
  </div>
);
};


export default RatingDistribution;