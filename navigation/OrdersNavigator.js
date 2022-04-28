import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import Colors from '../Constants/Colors';
import { OrdersScreen } from '../screens/shop/Orders.component';

const { Navigator, Screen } = createStackNavigator();

const NavBarConfig = {
	// header: (props) => <CustomNavBar {...props} />,
	headerTitleAlign: 'center',
	headerTintColor: Colors.black,
	headerTitleStyle: {
		fontSize: 18,
		fontWeight: '200',
		color: Colors.black,
		// fontWeight: "700",
	},
	headerTitle: (props) => <Text {...props}>{props.children}</Text>,
	headerBackImage: (props) => (
		<MaterialCommunityIcons
			name="chevron-left"
			size={30}
			color={props.tintColor}
		/>
	),
};

export const OrdersNavigator = () => {
	return (
		<Navigator screenOptions={NavBarConfig}>
			<Screen
				name="Orders"
				component={OrdersScreen}
				options={({ navigation }) => ({
					headerLeft: (props) => {
						return (
							<Appbar.Action
								{...props}
								color={props.tintColor}
								icon="menu"
								onPress={() => navigation.openDrawer()}
							/>
						);
					},
				})}
			/>
		</Navigator>
	);
};
