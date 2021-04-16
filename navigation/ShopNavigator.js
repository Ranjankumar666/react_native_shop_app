import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/shop/Home.component";
import { Cart } from "../screens/shop/Cart.component";
import { Detail } from "../screens/shop/Detail.component";
import { CustomNavBar } from "../components/CustomNavBar.component";
import { Text, Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Orders } from "../screens/shop/Orders.component";

const { Navigator, Screen } = createStackNavigator();

export const NavBarConfig = {
    // header: (props) => <CustomNavBar {...props} />,
    headerTitleAlign: "center",
    headerTintColor: Colors.black,
    headerTitleStyle: {
        fontSize: 18,
        fontWeight: "200",
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

export const ShopNavigator = () => {
    return (
        <Navigator screenOptions={NavBarConfig}>
            <Screen
                name="Home"
                component={Home}
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
                    headerRight: (props) => (
                        <Appbar.Action
                            {...props}
                            color={props.tintColor}
                            icon="cart"
                            onPress={() => navigation.navigate("Cart")}
                        />
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
