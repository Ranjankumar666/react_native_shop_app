import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
	Provider as PaperProvider,
	DefaultTheme,
	configureFonts,
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { DrawerNavigator } from './navigation/RootDrawer';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { fontConfig } from './Constants/fontConfig';
import { enableScreens } from 'react-native-screens';
import Colors from './Constants/Colors';
import * as Notifications from 'expo-notifications';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './store/slices/auth';
import { productSlice } from './store/slices/product';
import { userSlice } from './store/slices/user';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

// LogBox.ignoreLogs(['Setting a timer']);

enableScreens();

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.indigo,
		text: Colors.black,
	},
	fonts: configureFonts(fontConfig),
};

const store = configureStore({
	reducer: {
		products: productSlice.reducer,
		user: userSlice.reducer,
		auth: authSlice.reducer,
	},
});

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		const loadFonts = async () => {
			await Font.loadAsync({
				open_sans: require('./assets/Open_Sans/OpenSans-Regular.ttf'),
				open_sans_light: require('./assets/Open_Sans/OpenSans-Light.ttf'),
				open_sans_medium: require('./assets/Open_Sans/OpenSans-SemiBold.ttf'),
				open_sans_bold: require('./assets/Open_Sans/OpenSans-Bold.ttf'),
			});

			setFontsLoaded(true);
		};

		loadFonts();
	}, []);

	if (!fontsLoaded) {
		return <AppLoading />;
	}
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<StatusBar
					style={Platform.OS === 'android' && 'dark'}
					backgroundColor={Platform.OS === 'android' && 'white'}
				/>
				<NavigationContainer>
					<DrawerNavigator />
				</NavigationContainer>
			</PaperProvider>
		</Provider>
	);
}
