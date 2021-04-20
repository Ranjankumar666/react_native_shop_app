import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "./Colors";
import React from "react";
import { Text } from "react-native-paper";

export const NavConfig = {
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
