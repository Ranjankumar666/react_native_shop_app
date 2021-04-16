import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, IconButton, List, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../Constants/Colors";

import { removeFromCart } from "../../store/actions/user";

export const CartItem = (props) => {
    const dispatch = useDispatch();
    const itemId = props.id;

    return (
        <Card.Title
            style={{
                elevation: 1,
                backgroundColor: "white",
                marginBottom: 5,
            }}
            left={(props) => <List.Icon {...props} icon="shopping" />}
            title={props.title}
            right={(props) => (
                <IconButton
                    {...props}
                    icon="delete"
                    onPress={() => dispatch(removeFromCart(itemId))}
                />
            )}
        />
    );
};

export const Cart = () => {
    const { cart } = useSelector((state) => state.user);
    const { availableProducts } = useSelector((state) => state.products);

    const cartItems = availableProducts.filter(
        (item) => cart.indexOf(item.id) > -1
    );
    // console.log(cartItems);

    if (cartItems.length <= 0) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Title>Your Cart is empty</Title>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem
                        title={item.title}
                        imageUrl={item.imageUrl}
                        id={item.id}
                    />
                )}
            />
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 10,
                }}
            >
                <Button
                    icon="package-variant"
                    mode="contained"
                    style={{
                        backgroundColor: Colors.indigo,
                    }}
                >
                    Order Now
                </Button>
            </View>
        </View>
    );
};
