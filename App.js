import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
    Provider as PaperProvider,
    DefaultTheme,
    configureFonts,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { DrawerNavigator } from "./navigation/RootDrawer";
import productReducer from "./store/reducers/product";
import userReducer from "./store/reducers/user";
import authReducer from "./store/reducers/auth";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { fontConfig } from "./Constants/fontConfig";
import { enableScreens } from "react-native-screens";
import Colors from "./Constants/Colors";
import thunk from "redux-thunk";

enableScreens();

const reducers = combineReducers({
    products: productReducer,
    user: userReducer,
    auth: authReducer,
});

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.indigo,
        text: Colors.black,
    },
    fonts: configureFonts(fontConfig),
};

const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                open_sans: require("./assets/Open_Sans/OpenSans-Regular.ttf"),
                open_sans_light: require("./assets/Open_Sans/OpenSans-Light.ttf"),
                open_sans_medium: require("./assets/Open_Sans/OpenSans-SemiBold.ttf"),
                open_sans_bold: require("./assets/Open_Sans/OpenSans-Bold.ttf"),
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
                    style={Platform.OS === "android" && "dark"}
                    backgroundColor={Platform.OS === "android" && "white"}
                />
                <NavigationContainer>
                    <DrawerNavigator />
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        // justifyContent: "center",
    },
});
