import React from 'react';
import { Appbar } from 'react-native-paper';

export const CustomNavBar = ({ navigation, previous, scene }) => {
	const { options } = scene.descriptor;
	const title =
		options.headerTitle !== undefined
			? options.headerTitle
			: options.title !== undefined
			? options.title
			: scene.route.name;

	return (
		<Appbar.Header statusBarHeight={20} style={options.headerStyle}>
			{previous ? (
				<Appbar.BackAction onPress={navigation.goBack} />
			) : (
				<Appbar.Action
					icon="menu"
					onPress={() => navigation.openDrawer()}
				/>
			)}
			<Appbar.Content title={title} />
			{!previous && (
				<Appbar.Action
					icon="cart"
					onPress={() => navigation.navigate('Cart')}
				/>
			)}
		</Appbar.Header>
	);
};
