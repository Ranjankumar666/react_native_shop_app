import React from "react";
import { View, StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Title, Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../Constants/Colors";

export const DrawerContent = (props) => {
    const [active, setActive] = useState("first");
    // const navigation = useNavigation();
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userProfile}>
                    <Avatar.Icon
                        icon="snowman"
                        style={{
                            backgroundColor: Colors.indigo,
                        }}
                        // source={require("../assets/iphone.jpg")}
                        size={50}
                    />
                    <Title style={styles.title}>Ranjan Kumar</Title>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: { flex: 1, padding: 10, backgroundColor: Colors.white },
    userProfile: {
        // alignItems: "center",
        alignItems: "center",
    },
    title: {
        marginTop: 10,
        fontSize: 14,
        color: Colors.black,
        // fontWeight: "bold",
    },
    drawerSection: {
        marginTop: 15,
    },
});
