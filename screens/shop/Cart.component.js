import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import {
	Button,
	IconButton,
	List,
	Subheading,
	Title,
	Card,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import { orderCart } from '../../store/actions/user';
import { userSlice } from '../../store/slices/user';

export const CartItem = (props) => {
	const dispatch = useDispatch();
	const itemId = props.id;
	const [quantity, setQuantity] = useState(1);

	return (
		<Card.Title
			style={{
				elevation: 1,
				backgroundColor: 'white',
				marginBottom: 5,
			}}
			subtitle={`Qty: ${quantity} Amt: \$${props.sum}`}
			left={(props) => <List.Icon {...props} icon="shopping" />}
			title={props.title}
			right={(props) => (
				<View style={{ flexDirection: 'row' }}>
					<IconButton
						{...props}
						icon="minus"
						onPress={() => {
							setQuantity((p) => (p > 1 ? p - 1 : p));
							dispatch(userSlice.actions.subQuantity(itemId));
						}}
					/>
					<IconButton
						{...props}
						icon="plus"
						onPress={() => {
							setQuantity((p) => p + 1);
							dispatch(userSlice.actions.addQuantity(itemId));
						}}
					/>
					<IconButton
						{...props}
						icon="delete"
						onPress={() => {
							dispatch(userSlice.actions.removeFromCart(itemId));
						}}
					/>
				</View>
			)}
		/>
	);
};

export const Cart = ({ navigation }) => {
	const { cart } = useSelector((state) => state.user);
	const { token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	if (cart.length <= 0) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Title>Your Cart is empty</Title>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<FlatList
				data={cart}
				renderItem={({ item }) => (
					<CartItem
						title={item.productTitle}
						id={item.id}
						sum={item.sum}
					/>
				)}
				keyExtractor={(item, idx) => String(item.id + idx)}
			/>
			<View style={{ alignItems: 'center', justifyContent: 'center' }}>
				<Subheading>Amount to be payed</Subheading>
				<Title>
					$
					{parseFloat(
						cart.reduce((acc, ele) => (acc += ele.sum), 0)
					).toFixed(2)}
				</Title>
			</View>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					marginVertical: 10,
				}}
			>
				{token ? (
					<Button
						icon="package-variant"
						mode="contained"
						onPress={() => {
							dispatch(orderCart(cart));
							navigation.navigate('Orders');
						}}
					>
						Order Now
					</Button>
				) : (
					<Button
						mode="contained"
						icon="login"
						onPress={() => {
							navigation.navigate('Log In');
						}}
					>
						Log in to order
					</Button>
				)}
			</View>
		</View>
	);
};
