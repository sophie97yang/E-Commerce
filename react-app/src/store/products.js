import { normalizeObj } from "./normalize"

//Action Type Constants
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const CREATE_PRODUCT = "products/CREATE_PRODUCT"
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT"
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT"
const ADD_REVIEW = "products/CREATE_REVIEW"
const UPDATE_REVIEW = "products/UPDATE_REVIEW"
const REMOVE_REVIEW = 'products/DELETE_REVIEW'

//Action Creators
const getAllProduct = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

const addProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

export const editProduct = (product) => ({
    type: UPDATE_PRODUCT,
    product
})

const deleteProduct = (productId) => ({
    type: REMOVE_PRODUCT,
    productId

})

const addReview = (review) => ({
    type: ADD_REVIEW,
    review

})

const updateReview = (review) => ({
    type:UPDATE_REVIEW,
    review
})

const removeReview = (productId,reviewId) => ({
    type:REMOVE_REVIEW,
    productId,
    reviewId
})


//Thunk Action Creators
//Get All Products
export const getAllProducts = () => async (dispatch) => {
    const res = await fetch('/api/products/all')
    if (res.ok) {
        const {products} = await res.json();
        dispatch(getAllProduct(products))
        return products
    } else {
       const data = await res.json();
       return data
    }

}

//Add Product to Products
export const createProduct = (formData) => async (dispatch) => {
    try {
        const res = await fetch('/api/products/new', {
            method: "POST",
            body: formData
        })

        if (res.ok) {
            const {product} = await res.json()
            dispatch(addProduct(product))
            return product
        } else {
            const data = await res.json();
            console.log("There was an error creating product")
            return data
        }
    } catch (error) {
        console.error('error occurred', error);
        return [' error occurred'];
    }
}


//Edit A Product
export const updateProduct = (formData, productId) => async(dispatch) => {

    try {

        const res = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            body: formData
        })


        if(res.ok) {
            const product = await res.json();
            dispatch(editProduct(product))
            return product
        } else {
            const data = await res.json();

            return data;
        }
    } catch (error) {
        console.error('error occurred', error);
        return [' error occurred'];
    }
}


//Delete A Product
export const removeProduct = (productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json();
        await dispatch(deleteProduct(productId))
        await dispatch(getAllProducts())
        return data
    } else {
        const data = await res.json();
        return data;
    }

}

//create a review
export const createReview= (review,productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/new`, {
        method: "POST",
        body: review

    });

    if (res.ok) {
        const {review} = await res.json();
        await dispatch(addReview(review));
        return review
    } else {
        const data = await res.json();
        return data;
    }
}

//editing a review
export const editReview= (formData, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/edit`, {
        method: "PUT",
        body: formData
    });

    if (res.ok) {
        const {review} = await res.json();
        dispatch(updateReview(review))
        return review
    } else {
        const data = await res.json();
        return data
    }
}


// //editing a review
// export const editReview= (review) => async (dispatch) => {
//     const res = await fetch(`/api/reviews/${review.id}/edit`, {
//         method: "PUT",
//         body: review
//     });

//     if (res.ok) {
//         const {review} = await res.json();
//         dispatch(updateReview(review))
//         return review
//     } else {
//         const data = await res.json();
//         return data
//     }
// }

//deleting a review
export const deleteReview = (productId,reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}/delete`, {
        method: "DELETE"
    }).catch((res)=>{
        return res
    })

    const data = await res.json();
    if (res.ok) {
        await dispatch(removeReview(productId,reviewId))
        await dispatch(getAllProducts())
        return data
    } else {
        return data
    }
}

//edit product image
export const editImage = (formData,productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/image/update`, {
        method:"PUT",
        body:formData
    }).catch(res=>res)

    if(res.ok) {
        const product = await res.json();
        dispatch(editProduct(product))
        return product
    } else {
        const data = await res.json();
        return data;
    }
}


const initialState={};

const productsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            newState = {...state};
            newState.products = normalizeObj(action.products)
            return newState;

        case CREATE_PRODUCT:
            newState = { ...state };
            newState.products[action.product.id] = action.product;
            return newState;

        case UPDATE_PRODUCT:
            newState = { ...state };
            newState.products[action.product.id] = action.product;
            return newState;

        case REMOVE_PRODUCT:
            newState = { ...state };
            delete newState.products[action.productId];
            return newState;

        case ADD_REVIEW:
            newState = {...state };
            newState.products[action.review.product_id].reviews = [...newState.products[action.review.product_id].reviews, action.review]
            return newState;

        case UPDATE_REVIEW:
            newState = {...state};
            let index=0
            for (let i =0;i<newState.products[action.review.product_id].reviews.length;i++) {
                let review = newState.products[action.review.product_id].reviews[i];
                if (review.id===action.review.id) {
                    index=i;
                    break;
                }
            }
            newState.products[action.review.product_id].reviews[index] = action.review;
            return newState;

        case REMOVE_REVIEW:
            newState = {...state };
            let index_to_remove=0
            for (let i =0;i<newState.products[action.productId].reviews.length;i++) {
                let review = newState.products[action.productId].reviews[i];
                if (review.id===action.reviewId) {
                    index_to_remove=i;
                    break;
                }
            }
            delete newState.products[action.productId].reviews[index_to_remove];

            return newState;

        default:
            return state



    }
}

export default productsReducer;
