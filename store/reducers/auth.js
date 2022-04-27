const initState = {
	isAuthenticated: false,
	token: null,
	userId: null,
	refreshToken: null,
	email: null,
};

export default (state = initState, action) => {
	switch (action.type) {
		case 'AUTHENTICATE':
			return {
				isAutheticated: true,
				userId: action.payload.userId,
				token: action.payload.token,
				refreshToken: action.payload.refreshToken,
			};

		case 'LOGOUT':
			return {
				isAuthenticated: false,
				userId: null,
				token: null,
				refeshToken: null,
			};

		case 'USERDATA':
			return {
				...state,
				email: action.email,
			};

		default:
			return state;
	}
};
