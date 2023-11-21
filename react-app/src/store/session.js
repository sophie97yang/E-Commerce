// constants
const SET_MEMBER = "session/SET_MEMBER";
const REMOVE_MEMBER = "session/REMOVE_MEMBER";
const ADD_ORDER = "session/ADD_ORDER";

const setMember = (member) => ({
	type: SET_MEMBER,
	payload: member,
});

const removeMember = () => ({
	type: REMOVE_MEMBER,
});

// const addCart = (productId,quantity) => ({
// 	type:
// })
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

export default function sessionReducer(state = initialState, action){
	switch (action.type) {
		case SET_MEMBER:
			return { member: action.payload };
		case REMOVE_MEMBER:
			return { member: null };
		default:
			return state;
	}
}
