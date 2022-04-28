import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import {
	Card,
	IconButton,
	Snackbar,
	Text,
	ActivityIndicator,
	Title,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../Constants/Colors';
import { getAllProducts } from '../../store/actions/product';
import { userSlice } from '../../store/slices/user';

export const Message = (props) => (
	<View
		style={{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		{props.children}
	</View>
);

export const CardItem = (props) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => state.user);

	const isPresentInCart = () => cart.find((item) => item.id === props.id);
	let cartIcon = isPresentInCart() ? 'cart' : 'cart-outline';

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={{
				width: '49.5%',
				marginBottom: 5,
			}}
			onPress={() =>
				navigation.navigate('Product Detail', {
					id: props.id,
				})
			}
		>
			<Card>
				<Card.Title
					title={props.title}
					titleStyle={{ fontSize: 14, color: Colors.black }}
				/>

				<Card.Cover source={{ uri: props.imageUrl }} />
				<Card.Actions style={{ justifyContent: 'space-between' }}>
					<Text style={{ fontWeight: 'bold', color: Colors.black }}>
						${props.price}
					</Text>
					<IconButton
						icon={cartIcon}
						color={Colors.black}
						size={25}
						onPress={() => {
							if (isPresentInCart()) {
								dispatch(
									userSlice.actions.removeFromCart(props.id)
								);
								return;
							}

							dispatch(
								userSlice.actions.addToCart({
									id: props.id,
									title: props.title,
									price: props.price,
									userPushToken: props.userPushToken,
								})
							);
						}}
					/>
				</Card.Actions>
			</Card>
		</TouchableOpacity>
	);
};

export const Home = (props) => {
	const { availableProducts } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const { showSnackbar, message } = useSelector((state) => state.user);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			setError(false);
			setIsRefreshing(true);
			await dispatch(getAllProducts());
			setIsRefreshing(false);
		} catch (err) {
			console.log('HOME COMPONENT', err);
			setIsRefreshing(false);
			setError({
				message: 'Something went wrong',
			});
		}
	}, [dispatch, setError, setIsLoading]);

	/**Another UseEffect for reloading products when chaning drawers */
	const { navigation } = props;
	useEffect(() => {
		const sub = navigation.addListener('focus', fetchData);

		return sub;
	}, [fetchData]);

	useEffect(() => {
		setIsLoading(true);
		fetchData()
			.then(() => setIsLoading(false))
			.catch((err) => {
				setIsLoading(false);
				setError({
					message: 'Something went wrong',
				});
			});
	}, []);

	if (isLoading) {
		return (
			<Message>
				<ActivityIndicator
					animating={true}
					color={Colors.indigo}
					size="large"
				/>
			</Message>
		);
	}

	if (error) {
		return (
			<Message>
				<Title>{error.message}</Title>
				<IconButton icon="reload" size={24} onPress={fetchData} />
			</Message>
		);
	}

	if (!isLoading && (!availableProducts || availableProducts.length <= 0)) {
		return (
			<Message>
				<Title>No Items yet</Title>
			</Message>
		);
	}
	return (
		<View style={{ flex: 1, padding: 5 }}>
			<FlatList
				refreshing={isLoading}
				onRefresh={fetchData}
				data={availableProducts}
				numColumns={2}
				renderItem={({ item }) => (
					<CardItem
						id={item.id}
						title={item.title}
						imageUrl={item.imageUrl}
						price={item.price}
						userPushToken={item.userPushToken}
					/>
				)}
				keyExtractor={(item) => item.id}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
			/>
			<Snackbar
				visible={showSnackbar}
				duration={1000}
				onDismiss={() => dispatch(userSlice.actions.hideSnackbar())}
			>
				{message}
			</Snackbar>
		</View>
	);
};
