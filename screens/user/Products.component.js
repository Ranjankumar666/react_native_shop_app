import React, { useCallback, useEffect, useState } from 'react';
import {
	View,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import {
	Card,
	IconButton,
	Title,
	Text,
	FAB,
	Snackbar,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProducts } from '../../store/actions/product';
import Colors from '../../Constants/Colors';
import { deleteProduct } from '../../store/actions/product';
import { useNavigation } from '@react-navigation/native';
import { Message } from '../shop/Home.component';

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: Colors.indigo,
	},
});

export const NewProduct = () => {
	const navigation = useNavigation();
	return (
		<FAB
			style={styles.fab}
			icon="plus"
			onPress={() =>
				navigation.navigate('Edit Product', {
					title: 'Create',
				})
			}
		/>
	);
};

export const UserProductCard = (props) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={{
				width: '49.5%',
				marginBottom: 5,
			}}
			onPress={() =>
				navigation.navigate('Edit Product', {
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
						icon="delete"
						color={Colors.black}
						size={25}
						onPress={() => props.delete(props.id)}
					/>
				</Card.Actions>
			</Card>
		</TouchableOpacity>
	);
};

export const UserProduct = (props) => {
	const [visible, setVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const { userProducts } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const { navigation } = props;

	const onPressDelete = async (id) => {
		await dispatch(deleteProduct(id));
		setVisible(true);
		fetchData();
	};

	const onDismissSnackBar = () => {
		setVisible(false);
	};

	const fetchData = useCallback(async () => {
		try {
			setError(false);
			setIsLoading(true);
			await dispatch(getUserProducts());
		} catch (err) {
			setError({
				message: 'Something went wrong',
			});
		} finally {
			setIsLoading(false);
		}
	}, [dispatch]);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const sub = navigation.addListener('focus', fetchData);
		return sub;
	}, [fetchData]);

	if (isLoading) {
		return (
			<Message>
				<ActivityIndicator
					color={Colors.indigo}
					animating={true}
					size="large"
				/>
			</Message>
		);
	}

	if (!isLoading && (!userProducts || userProducts.length <= 0)) {
		return (
			<Message>
				<Title>You haven't posted any products</Title>
				<NewProduct />
			</Message>
		);
	}

	if (error) {
		return (
			<Message>
				<Title>{error.message}</Title>
				<IconButton icon="reload" onPress={fetchData} />
			</Message>
		);
	}
	return (
		<View style={{ flex: 1, padding: 5 }}>
			<FlatList
				data={userProducts}
				numColumns={2}
				columnWrapperStyle={{
					justifyContent: 'space-between',
				}}
				renderItem={({ item }) => (
					<UserProductCard
						id={item.id}
						title={item.title}
						price={item.price}
						imageUrl={item.imageUrl}
						delete={onPressDelete}
					/>
				)}
			/>
			<NewProduct />
			<Snackbar
				visible={visible}
				onDismiss={onDismissSnackBar}
				duration={1000}
			>
				Item Deleted
			</Snackbar>
		</View>
	);
};
