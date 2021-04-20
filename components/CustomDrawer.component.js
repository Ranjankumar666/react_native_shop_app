import React from "react";
import { View, StyleSheet } from "react-native";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { Avatar, Title, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../Constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../store/actions/auth";

export const LogoutComponent = (props) => {
    const dispatch = useDispatch();
    // const navigation = useNavigation();

    return (
        <>
            <Divider />
            <View>
                <DrawerItem
                    label="Sign out"
                    icon={(props) => (
                        <MaterialCommunityIcons {...props} name="logout" />
                    )}
                    onPress={async () => {
                        // await dispatch(getUserData());
                        dispatch(signout());
                        props.navigateBack();
                    }}
                />
            </View>
        </>
    );
};

export const DrawerContent = (props) => {
    const [active, setActive] = useState("first");
    const { token, email } = useSelector((state) => state.auth);
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
                    <Title style={styles.title}>
                        {email ? email : "Anonymous"}
                    </Title>
                </View>
            </View>
            <DrawerItemList {...props} />
            {token && (
                <LogoutComponent
                    navigateBack={() => props.navigation.navigate("Home")}
                />
            )}
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    drawerContent: { flex: 1, padding: 10, backgroundColor: Colors.white },
    userProfile: {
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
