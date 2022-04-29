import { createSlice } from '@reduxjs/toolkit';

const initState = {
	isAuthenticated: false,
	token: null,
	userId: null,
	refreshToken: null,
	email: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initState,
	reducers: {
		autheticate(state, action) {
			state.isAuthenticated = true;
			state.userId = action.payload.userId;
			state.token = action.payload.token;
			state.refreshToken = action.payload.refreshToken;
		},
		logout(state) {
			state.isAuthenticated = false;
			state.userId = null;
			state.token = null;
			state.refreshToken = null;
			state.email = null;
		},
		userData(state, action) {
			state.email = action.payload;
		},
	},
});
