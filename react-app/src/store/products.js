import { csrfFetch } from "./csrf";

//get all products
//get product description
//create a product
//update a product
//delete a product

const GET_PRODUCT = "products/GET_PRODUCT"
const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS"
const CREATE_PRODUCT = "products/CREATE_PRODUCT"
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT"
const REMOVE_PRODUCT = "products/REMOVE_PRODUCT"

const getAProduct = (product) => ({
    type: GET_PRODUCT,
    payload: product
})

const getAllProduct = (products) => ({
    type: GET_ALL_PRODUCTS,
    payload: products
})

const addProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
})

const editProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product
})

const deleteProduct = (productId) => ({
    type: REMOVE_PRODUCT,

})


//Get All Products
export const getAllProducts = () => async (dispatch) => {
    const res = await csrfFetch('/api/products')
``
    if (res.ok) {
        const products = await res.json();
        dispatch(getAllProduct(products))
        return products
    }

}

//Get Product by Id
export const getOneProduct = () => async(dispatch) => {
    const res = await csrfFetch('/api/products/:id')

    if (res.ok) {
        const product = await res.json();
        dispatch(getAProduct(product))
        return product
    }
}


//Add Product to Products

export const addProducts = (product) => async(dispatch) => {
    const res = await csrfFetch('/api/products/add', {
        method: "POST",
        body: JSON.stringify({
            ...product
        })
    })

    if (res.ok) {
        const product = await res.json();
        dispatch(addProduct(product))
        return product
    }
}


//Edit A Product
export const updateProduct = (product, productId) => async(dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
    })
  

    if(res.ok) {
        const product = await res.json();
        dispatch(editProduct(product))
        dispatch(getAllProducts())
        return product
    }
}


//Delete A Product
export const removeProduct = (productId) => async(dispatch) => {
    const res = await csrfFetch(`/api/products/${productId}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json();
        await dispatch(deleteProduct(productId))
        await dispatch(getAllProducts())
        return data
    }

}



let newState;

const productsReducer = (state = {}, action) => {
    switch (action.type) {
    
        case GET_PRODUCT:
            newState = { ...state, [action.product.id]: action.product }
            return newState;

        // ??
        case GET_ALL_PRODUCTS: 
            newState = {};
            action.products.Products.forEach((product) => {
                newState[product.id] = product;
            })
            return newState;

        case CREATE_PRODUCT:
            newState = { ...state, [action.product.id]: action.product }
            return newState;

        case UPDATE_PRODUCT:
            newState = { ...state, [action.product.id]: action.product }
            return newState;

        case REMOVE_PRODUCT:
            newState = { ...state };
            delete newState[action.productId]

        default:
            return state



    }
}

export default productsReducer;