import Product from '../../models/product';

import { createSlice } from '@reduxjs/toolkit';
const initState = {
	availableProducts: [],
	userProducts: [],
};

export const productSlice = createSlice({
	name: 'product',
	initialState: initState,
	reducers: {
		getAllProduct(state, action) {
			state.availableProducts = action.payload.products;
		},
		getUserProducts(state, action) {
			state.userProducts = action.payload.userProducts;
		},
		delete(state, action) {
			state.availableProducts = state.availableProducts.filter(
				(item) => item.id !== action.payload.id
			);
		},
		create(state, action) {
			const { item, userPushToken, id } = action.payload;
			const product = new Product(
				id,
				item.ownerId,
				item.title,
				item.imageUrl,
				item.description,
				Number(item.price),
				userPushToken
			);
			state.availableProducts.push(product);
		},
	},
});
