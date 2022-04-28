import { baseUrl } from '../../Constants/dbURL';
import { userSlice } from '../slices/user';

const notifyOwner = async (items) => {
	for (let item of items) {
		fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-Encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				to: item.userPushToken,
				title: 'New order',
				body: `Your product "${item.productTitle}" has been ordered`,
				data: item,
			}),
		});
	}
};

export const removeFromCart = (id) => (dispatch) => {
	/**REmove from db */
	// const response = await fetch(`${baseUrl}cart/${userId}.json?auth=${token}`, {
	//     method: "DELETE",
	// });
	dispatch(userSlice.actions.removeFromCart({ itemId: id }));
};

export const getOrders = () => async (dispatch, getState) => {
	const { token, userId } = getState().auth;

	const response = await fetch(
		`https://rnshopapp-da3d8-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`
	);

	if (!response.ok) {
		throw new Error('Something went wrong');
	}

	const data = await response.json();

	const idWithData = Object.entries(data);
	const refinedData = [];
	for (let [id, val] of idWithData) {
		val.id = id;
		refinedData.push(val);
	}

	dispatch(
		userSlice.actions.getOrders({
			orders: refinedData,
		})
	);
};

export const getCart = () => async (dispatch, getState) => {
	const { userId, token } = getState().auth;

	const response = await fetch(`${baseUrl}cart/${userId}.json?auth=${token}`);

	if (!response.ok) {
		throw new Error('Something went wrong');
	}

	const data = await response.json();

	dispatch({
		type: 'GETCART',
		cart: data,
	});
};

export const orderCart = (items) => async (dispatch, getState) => {
	const { token, userId } = getState().auth;

	items = items.map((i) => i.toObject());

	const amount = parseFloat(
		items.reduce((acc, ele) => (acc += ele.sum), 0)
	).toFixed(2);

	const date = new Date().toISOString();

	const response = await fetch(
		`${baseUrl}orders/${userId}.json?auth=${token}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				items,
				amount,
				created_at: date,
			}),
		}
	);
	notifyOwner(items);
	if (!response.ok) {
		throw new Error('Something went wrong');
	}

	const { name } = await response.json();

	dispatch(
		userSlice.actions.order({ id: name, items, amount, created_at: date })
	);
};
