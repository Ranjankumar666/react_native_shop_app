// import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import {
    Button,
    List,
    Title,
    Text,
    Subheading,
    Paragraph,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../Constants/Colors";
import { addToCart, removeFromCart } from "../../store/actions/user";

export const Detail = ({ route, navigation }) => {
    const { availableProducts } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.user);
    const product = availableProducts.filter(
        (item) => item.id === route.params.id
    )[0];

    const isPresentInCart = () => cart.find((item) => item === route.params.id);

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.heading}>
                    <Subheading>{product.title}</Subheading>
                    <Title style={{ fontSize: 25, color: Colors.black }}>
                        ${product.price}
                    </Title>
                </View>
                <View style={styles.description}>
                    <Title>Product Details</Title>
                    <Paragraph style={{ color: Colors.gray }}>
                        {product.description}
                    </Paragraph>
                </View>
                <View style={styles.buttons}>
                    <Button
                        icon={isPresentInCart() ? "cart-remove" : "cart"}
                        mode="contained"
                        dark={isPresentInCart() ? true : false}
                        style={{
                            backgroundColor: isPresentInCart()
                                ? Colors.red
                                : Colors.white,
                        }}
                        onPress={() => {
                            if (isPresentInCart()) {
                                dispatch(removeFromCart(route.params.id));
                                return;
                            }
                            dispatch(addToCart(route.params.id));
                        }}
                    >
                        {isPresentInCart() ? "Remove Item" : "Add To Cart"}
                    </Button>
                    <Button
                        icon="package-variant"
                        mode="contained"
                        style={{ backgroundColor: Colors.indigo }}
                    >
                        Order Now
                    </Button>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        marginBottom: 10,
        textAlign: "center",
        color: Colors.black,
    },
    screen: {
        flex: 1,
        marginBottom: 10,
        // padding: 10,
    },
    imageContainer: {
        // flex: 1,
        width: "100%",
        overflow: "hidden",
        marginBottom: 10,
    },
    image: {
        width: "100%",
        height: 300,
    },
    buttons: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    description: {
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    heading: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        color: Colors.black,
    },
});
