import React from "react";
import { View } from "react-native";
import { Text, Appbar, Title } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { NavBarConfig } from "../../navigation/ShopNavigator";

const { Navigator, Screen } = createStackNavigator();
export const OrdersScreen = (props) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Title>You have no orders</Title>
        </View>
    );
};

export const Orders = () => {
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
