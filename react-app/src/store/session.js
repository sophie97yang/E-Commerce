// constants
const SET_MEMBER = "session/SET_MEMBER";
const REMOVE_MEMBER = "session/REMOVE_MEMBER";
const ADD_ORDER = "session/ADD_ORDER";
const UPDATE_ORDER = "session/UPDATE_ORDER";
//add to wishlist
const ADD_WISHLIST = 'session/ADD_WISHLIST';


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

		  firstName,
          lastName,
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
// //remove from cart
// export const deleteFromCart = (productId) => async(dispatch) => {
// 	const responses = await fetch(`/api`)

// }
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
			newState.member.orders=[...newState.member.orders,action.order]
			let index=0
            for (let i =0;i<newState.member.orders.length;i++) {
                let order = newState.member.orders[i];
                if (order.id===action.order.id) {
                    index=i;
                    break;
                }
            }
			newState.member.orders[index] = action.order;
			return newState
		case ADD_WISHLIST:
			newState = {...state};
			newState.member.products = [...newState.member.products,action.product]
			return newState
		default:
			return state;
	}
}
