import { editProduct } from "./products";
// constants
const SET_MEMBER = "session/SET_MEMBER";
const REMOVE_MEMBER = "session/REMOVE_MEMBER";
const ADD_ORDER = "session/ADD_ORDER";
const UPDATE_ORDER = "session/UPDATE_ORDER";
const ADD_WISHLIST = 'session/ADD_WISHLIST';
const REMOVE_WISHLIST = 'session/REMOVE_WISHLIST';
const REMOVE_CART = 'session/REMOVE_CART';

const setMember = (member) => ({
	type: SET_MEMBER,
	payload: member,
});

const removeMember = () => ({
	type: REMOVE_MEMBER,
});

const addCart = (order) => ({
	type: ADD_ORDER,
	order

})
const updateCart = (order) => ({
	type:UPDATE_ORDER,
	order
})

const addWishlist = (product) => ({
	type:ADD_WISHLIST,
	product
});

const removeWishlist = (productId) => ({
	type:REMOVE_WISHLIST,
	productId
});

const removeCart = (orderId) => ({
	type:REMOVE_CART,
	orderId
})

const initialState = { member: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setMember(data));
	}
};

export const login = ({email, password}) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setMember(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeMember());
	}
};

export const signUp = ({firstName, lastName, address, city, state, seller, email, password}) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
		  "first_name":firstName,
          "last_name":lastName,
          address,
          city,
          state,
          seller,
          email,
          password

		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setMember(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const addOrder = (quantity,productId) => async(dispatch) => {
	const response = await fetch(`/api/orders/add/${productId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({quantity})
	});

	if (response.ok) {
		const {cart} = await response.json();
		dispatch(addCart(cart));
		return cart;
	} else {
		const data = await response.json();
		return data;
	}
}

export const editOrder = (quantity,productId) => async(dispatch) => {
	const response = await fetch(`/api/orders/add/${productId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({quantity})
	});

	if (response.ok) {
		const {cart} = await response.json();
		dispatch(updateCart(cart));
		return cart;
	} else {
		const data = await response.json();
		return data;
	}
}
//remove product from cart
export const deleteFromCart = (productId) => async(dispatch) => {
	const response = await fetch(`/api/orders/remove/${productId}`,
	{method:'DELETE'
});
	if (response.ok) {
		const {cart} = await response.json();
		dispatch(updateCart(cart));
		return cart
	} else {
		const data = await response.json();
		return data;
	}

}

//remove cart entirely
export const deleteCart = (cart,productId) => async(dispatch) => {
	const response = await fetch(`/api/orders/remove/${productId}`,
	{method:'DELETE'
});
	if (response.ok) {
		dispatch(removeCart(cart.id));
	}else {
		const data = await response.json();
		return data;
	}
}

export const addToWishlist = (productId) => async (dispatch) => {
	const response = await fetch(`/api/wishlist/add/${productId}`, {
		method: "POST"
	});

	if (response.ok) {
		const {product} = await response.json();
		dispatch(addWishlist(product));
		return product;
	} else {
		const data = await response.json();
		return data;
	}
}

export const removeFromWishlist = (productId) => async (dispatch) => {
	const response = await fetch(`/api/wishlist/remove/${productId}`, {
		method: "DELETE"
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(removeWishlist(productId));
		return data;
	} else {
		const data = await response.json();
		return data;
	}
}
//bonus:complete transaction
export const completeTransaction= () => async (dispatch) => {
	const response = await fetch(`/api/orders/cart/purchase`,{
		method:"POST"
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(updateCart(data.cart));
		dispatch(editProduct(data.product));
		return data;
	} else {
		const data = await response.json();
		return data;
	}
}
//bonus: make a return
export const createReturn = (orderId,productId) => async (dispatch) => {

	const response = await fetch(`/api/orders/${orderId}/product/${productId}/return`,{
		method:"POST"
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(updateCart(data.order));
		dispatch(editProduct(data.product));
		return data;
	} else {
		const data = await response.json();
		return data;
	}
}

export default function sessionReducer(state = initialState, action){
	let newState;
	switch (action.type) {
		case SET_MEMBER:
			return { member: action.payload };
		case REMOVE_MEMBER:
			return { member: null };
		case ADD_ORDER:
			newState = {...state};
			newState.member.orders=[...newState.member.orders,action.order]
			return newState
		case UPDATE_ORDER:
			newState = {...state};
			let index=0;
            for (let i =0;i<newState.member.orders.length;i++) {
                let order = newState.member.orders[i];
                if (order.id===action.order.id) {
                    index=i;
                    break;
                }
            }
			newState.member.orders[index] = action.order;
			return newState
		case REMOVE_CART:
			newState = {...state};
			let index_to_remove=0;
			for (let i =0;i<newState.member.orders.length;i++) {
                let order = newState.member.orders[i];
                if (order.id===action.orderId) {
                    index_to_remove=i;
                    break;
                }
			}
			newState.member.orders.splice(index_to_remove,1);
			return newState;
		case ADD_WISHLIST:
			newState = {...state};
			newState.member.products = [...newState.member.products,action.product]
			return newState
		case REMOVE_WISHLIST:
			newState = {...state};
			let found_product=0;
			for (let i =0;i<newState.member.products.length;i++) {
                let product = newState.member.products[i];
                if (product.id===action.productId) {
                    found_product=i;
                    break;
                }
			}
			newState.member.products.splice(found_product,1);
			return newState;
		default:
			return state;
}
}
