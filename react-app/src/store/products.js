import { normalizeObj } from "./normalize"

//Action Type Constants
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const CREATE_PRODUCT = "products/CREATE_PRODUCT"
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT"
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT"
const ADD_REVIEW = "products/CREATE_REVIEW"
const UPDATE_REVIEW = "products/UPDATE_REVIEW"

//Action Creators
const getAllProduct = (products) => ({
    type: GET_ALL_PRODUCTS,
    products
})

const addProduct = (product) => ({
    type: CREATE_PRODUCT,
    product
})

const editProduct = (product) => ({
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
       console.log(data)
       return data
    }

}

//Add Product to Products
// export const createProduct = (product) => async(dispatch) => {
//     const res = await fetch('/api/products/new', {
//         method: "POST",
//         body: product
//     })

//     if (res.ok) {
//         const {product}= await res.json();
//         dispatch(addProduct(product))
//         return product
//     } else {
//         const data = await res.json();
//         return data;
//     }
// }


//Add Product to Products
export const createProduct = (formData) => async (dispatch) => {
    console.log('creatingproduct thunk starting')
    console.log('this is the formdata', formData)
    try {
        const res = await fetch('/api/products/new', {
            method: "POST",
            // body: JSON.stringify({
            //     ...product
            // })
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
export const updateProduct = (product, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: product
    })


    if(res.ok) {
        const product = await res.json();
        dispatch(editProduct(product))
        return product
    } else {
        const data = await res.json();
        return data;
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
        return data
    } else {
        const data = await res.json();
        return data;
    }

}

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

export const editReview= (review) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review.id}/edit`, {
        method: "PUT",
        body: review
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //     ...review
        // })
    });

    if (res.ok) {
        const {review} = await res.json();
        dispatch(updateReview(review))
        return review
    } else {
        const data = await res.json();
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
            newState.products[action.products.id] = action.product;
            return newState;

        // case REMOVE_PRODUCT:
    //     newState = { ...state };
    //     delete newState[action.productId];
    //     return newState;

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
            newState.products[action.review.product_id].reviews[index] = action.review

        default:
            return state



    }
}

export default productsReducer;
