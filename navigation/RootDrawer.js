import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ShopNavigator } from "./ShopNavigator";
import { DrawerContent } from "../components/CustomDrawer.component";
import Colors from "../Constants/Colors";
import { Orders } from "../screens/shop/Orders.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserNavigator } from "./UserNavigator";
import { useSelector } from "react-redux";
import { AuthNavigator } from "../screens/user/Auth.component";

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerNavigator = () => {
    const { isAutheticated } = useSelector((state) => state.auth);
    return (
        <Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            drawerContentOptions={{
                activeTintColor: Colors.indigo,
            }}
            drawerType="back"
        >
            <Screen
                name="Home"
                component={ShopNavigator}
                options={{
                    drawerIcon: (props) => {
                        return (
                            <MaterialCommunityIcons name="home" {...props} />
                        );
                    },
                }}
            />
            {isAutheticated ? (
                <>
                    <Screen
                        name="Orders"
                        component={Orders}
                        options={{
                            drawerIcon: (props) => {
                                return (
                                    <MaterialCommunityIcons
                                        name="package-variant"
                                        {...props}
                                    />
                                );
                            },
                        }}
                    />
                    <Screen
                        name="Your Products"
                        component={UserNavigator}
                        options={{
                            drawerIcon: (props) => {
                                return (
                                    <MaterialCommunityIcons
                                        name="package"
                                        {...props}
                                    />
                                );
                            },
                        }}
                    />
                </>
            ) : (
                <Screen
                    component={AuthNavigator}
                    name="Log In/Sign Up"
                    options={{
                        drawerIcon: (props) => {
                            return (
                                <MaterialCommunityIcons
                                    name="login"
                                    {...props}
                                />
                            );
                        },
                    }}
                />
            )}
        </Navigator>
    );
};
