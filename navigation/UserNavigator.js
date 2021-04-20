import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";
import { UserProduct } from "../screens/user/Products.component";
import { EditProduct } from "../screens/user/Edit.component";
import { NavConfig as NavBarConfig } from "../Constants/NavConfig";

const { Navigator, Screen } = createStackNavigator();

export const UserNavigator = () => {
    return (
        <Navigator screenOptions={NavBarConfig}>
            <Screen
                name="Your Products"
                component={UserProduct}
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
                name="Edit Product"
                component={EditProduct}
                options={({ navigation, route }) => {
                    return {
                        headerTitle: route.params.title && route.params.title,
                    };
                }}
            />
        </Navigator>
    );
};
