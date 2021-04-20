import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import {
    authenticate,
    autoGetToken,
    getUserData,
} from "../../store/actions/auth";

export const AutoLogin = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const login = async () => {
            const user = await AsyncStorage.getItem("userData");

            if (!user) {
              
                navigation.navigate("Home");
                return;
            }

            const parsedUserData = JSON.parse(user);
            const { token, userId, refreshToken, expiresIn } = parsedUserData;

            if (expiresIn <= new Date().getTime() || !token || !userId) {
             
                navigation.navigate("Home");
                return;
            }

            dispatch(authenticate(token, userId, refreshToken));
            dispatch(getUserData());

            const timeLeft = expiresIn - new Date().getTime();
            dispatch(autoGetToken(timeLeft, refreshToken));
            navigation.navigate("Home");
        };

        login();
    }, []);
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <ActivityIndicator size="large" animating="true" />
        </View>
    );
};
