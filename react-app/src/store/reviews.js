// // import { csrfFetch } from "./csrf";


// MIGHT NOT EVEN USE REVIEWS STORE


// const GET_REVIEWS_FOR_PRODUCT = "reviews/GET_REVIEWS_FOR_PRODUCT";
// const DELETE_REVIEW = "reviews/DELETE_REVIEW";
// const CREATE_REVIEW = "reviews/CREATE_REVIEW"

// const getReviewsForProduct = (reviews) => {
//     return {
//         type: GET_REVIEWS_FOR_PRODUCT,
//         reviews
//     }
// }

// const deleteAReview = (reviewId) => {
//     return  {
//         type: DELETE_REVIEW,
//         reviewId
//     }
// }

// const createAReview = (review) => {
//     return {
//         type: CREATE_REVIEW,
//         review
//     }
// }

//Thunk Action Creators


// export const getReviewsForProductThunk = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

//     if (res.ok) {
//         const reviews = await res.json();
//         dispatch(getReviewsForProduct(reviews));
//         return reviews
//     }
// }

// export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
//   const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//     method: "DELETE"
//   });


//   if (res.ok) {
//     const confirm = await res.json();
//     dispatch(deleteAReview(reviewId));
//     return confirm
//   }
// };



// const reviewsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case GET_REVIEWS_FOR_PRODUCT: {
//             const newState = {};
//             action.reviews.Reviews.forEach(review => {
//                 newState[review.id] = review
//             })
//             return newState
//         }
//         case DELETE_REVIEW: {
//             const newState = { ...state }
//             delete newState[action.reviewId];
//             return newState;
//         }
//         case CREATE_REVIEW: {
//             const newState = { ...state }
//             newState[action.review.id] = action.review;
//             return newState;
//         }
//         default: {
//             return state;
//         }
//     }
// }

// export default reviewsReducer;
