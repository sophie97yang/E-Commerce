import { normalizeObj } from "./normalize"

//Action Type Constants
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const CREATE_PRODUCT = "products/CREATE_PRODUCT"
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT"
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT"
const ADD_REVIEW = "products/CREATE_REVIEW"

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
export const createProduct = (product) => async(dispatch) => {
    const res = await fetch('/api/products/new', {
        method: "POST",
        // body: JSON.stringify({
        //     ...product
        // })
        body: product
    })

    if (res.ok) {
        const {product}= await res.json();
        dispatch(addProduct(product))
        return product
    } else {
        console.log("There was an error creating product")
    }
}


//Edit A Product
export const updateProduct = (product, productId) => async(dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        body: product
    })


    if(res.ok) {
        const product = await res.json();
        dispatch(editProduct(product))
        return product
    } else {
        console.log('There was an error editing product')
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
        console.log("There was an error deleting product")
    }

}

export const createReview= (review,productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/new`, {
        method: "POST",
        body: review
    });

    if (res.ok) {
        const {review} = await res.json();
        dispatch(addReview(review))
        return review
    } else {
        console.log("There was an error creating review")
    }
}



const initialState={};

const productsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            newState = {... state};
            newState.products = normalizeObj(action.products)
            return newState;

        case CREATE_PRODUCT:
            newState = { ...state };
            newState.products[action.products.id] = action.product;
            return newState;

        case UPDATE_PRODUCT:
            newState = { ...state };
            newState.products[action.products.id] = action.product;
            return newState;

        case REMOVE_PRODUCT:
            newState = { ...state };
            delete newState[action.productId]

        case ADD_REVIEW:
            newState = { ...state };
            newState.products[action.review.product_id].reviews = [...newState.products[action.review.product_id].reviews, action.review]
        default:
            return state



    }
}

export default productsReducer;
