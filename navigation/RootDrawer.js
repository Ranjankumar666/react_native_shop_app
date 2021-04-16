import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ShopNavigator } from "./ShopNavigator";
import { DrawerContent } from "../components/CustomDrawer.component";
import Colors from "../Constants/Colors";
import { Orders } from "../screens/shop/Orders.component";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { Navigator, Screen } = createDrawerNavigator();

export const DrawerNavigator = () => {
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
        </Navigator>
    );
};
