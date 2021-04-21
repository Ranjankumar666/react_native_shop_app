import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/shop/Home.component";
import { Cart } from "../screens/shop/Cart.component";
import { Detail } from "../screens/shop/Detail.component";
import { Appbar, Badge } from "react-native-paper";
import Colors from "../Constants/Colors";
import { NavConfig as NavBarConfig } from "../Constants/NavConfig";
import { AutoLogin } from "../screens/shop/AutoLogin.component";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";

const { Navigator, Screen } = createStackNavigator();

const styles = StyleSheet.create({
    cartIcon: { position: "relative" },
    badge: {
        position: "absolute",
        textAlign: "center",
        top: 8,
        right: 6,
        backgroundColor: Colors.indigo,
    },
});

export const ShopNavigator = () => {
    const { cart } = useSelector((state) => state.user);
    return (
        <Navigator screenOptions={NavBarConfig}>
            <Screen
                component={AutoLogin}
                name="AutoLogin"
                options={{
                    headerShown: false,
                }}
            />
            <Screen
                name="Home"
                component={Home}
                options={({ navigation }) => ({
                    // headerShown: false,
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
                    headerRight: (props) => (
                        <>
                            <Appbar.Action
                                {...props}
                                color={props.tintColor}
                                icon="cart"
                                style={styles.cartIcon}
                                onPress={() => navigation.navigate("Cart")}
                            />
                            <Badge
                                children={cart.length}
                                style={styles.badge}
                                visible={cart.length > 0}
                                size={16}
                            />
                        </>
                    ),
                    headerTintColor: Colors.black,
                })}
            />
            <Screen name="Cart" component={Cart} />
            <Screen name="Product Detail" component={Detail} />
            {/* <Screen name="Orders" component={Orders} /> */}
        </Navigator>
    );
};
