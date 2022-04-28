import { createSlice } from '@reduxjs/toolkit';
import CartItem from '../../models/cartItem';

const initState = {
	cart: [],
	orders: [],
	showSnackbar: false,
	amount: 0,
	message: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initState,
	reducers: {
		addToCart(state, action) {
			const newItem = action.payload;

			const doesExist = state.cart.find((item) => item.id === newItem.id);

			if (doesExist) return;

			const item = new CartItem(
				newItem.id,
				1,
				newItem.price,
				newItem.title,
				newItem.userPushToken
			);
			state.cart.push(item.toObject());
		},
		showSnackbar(state) {
			state.showSnackbar = true;
			state.message = 'Item added to cart';
		},
		hideSnackbar(state) {
			state.showSnackbar = true;
		},
		removeFromCart(state, action) {
			state.message = 'Item removed from cart';
			state.showSnackbar = true;
			state.cart = state.cart.filter(
				(item) => item.id !== action.payload
			);
		},
		order(state, action) {
			const { id, items, amount, created_at } = action.payload;
			const createOrder = {
				id,
				items,
				amount,
				created_at,
			};

			state.orders.push(createOrder);
		},
		addQuantity(state, action) {
			const cart = [...state.cart];
			const item = cart.find((item) => item.id === action.payload);

			item.quantity += 1;

			state.cart = cart;
		},
		subQuantity(state, action) {
			const cart = [...state.cart];
			const item = cart.find((item) => item.id === action.payload);

			item.quantity -= 1;

			state.cart = cart;
		},
		getOrders(state, action) {
			state.orders = action.payload.orders;
		},
	},
});
