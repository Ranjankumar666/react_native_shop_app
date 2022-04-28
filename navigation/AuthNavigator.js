import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import { NavConfig } from '../Constants/NavConfig';
import { AuthScreen } from '../screens/user/Auth.component';

const { Navigator, Screen } = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<Navigator screenOptions={NavConfig}>
			<Screen
				name="Log In"
				component={AuthScreen}
				initialParams={{ type: 'signin' }}
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
			<Screen
				name="Sign Up"
				component={AuthScreen}
				initialParams={{ type: 'signup' }}
			/>
		</Navigator>
	);
};
