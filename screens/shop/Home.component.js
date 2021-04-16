import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, IconButton, Snackbar, Text, Title } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../Constants/Colors";
import { addToCart, removeFromCart } from "../../store/actions/user";

export const CardItem = (props) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.user);

    const isPresentInCart = () => cart.find((item) => item === props.id);
    let cartIcon = isPresentInCart() ? "cart" : "cart-outline";

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{
                width: "49.5%",
                marginBottom: 5,
            }}
            onPress={() =>
                navigation.navigate("Product Detail", {
                    id: props.id,
                })
            }
        >
            <Card>
                <Card.Title
                    title={props.title}
                    titleStyle={{ fontSize: 14, color: Colors.black }}
                />

                <Card.Cover source={{ uri: props.imageUrl }} />
                <Card.Actions style={{ justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: "bold", color: Colors.black }}>
                        ${props.price}
                    </Text>
                    <IconButton
                        icon={cartIcon}
                        color={Colors.black}
                        size={25}
                        onPress={() => {
                            if (isPresentInCart()) {
                                dispatch(removeFromCart(props.id));
                                return;
                            }

                            dispatch(addToCart(props.id));
                        }}
                    />
                </Card.Actions>
            </Card>
        </TouchableOpacity>
    );
};

export const Home = (props) => {
    const { availableProducts } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { showSnackbar, message } = useSelector((state) => state.user);

    // const isPresentInCart = () => cart.find((item) => item === props.id);
    // console.log(availableProducts);
    return (
        <View style={{ flex: 1, padding: 5 }}>
            <FlatList
                data={availableProducts}
                numColumns={2}
                renderItem={({ item }) => (
                    <CardItem
                        id={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        price={item.price}
                    />
                )}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />
            <Snackbar
                visible={showSnackbar}
                duration={1000}
                onDismiss={() =>
                    dispatch({
                        type: "HIDESNACKBAR",
                    })
                }
            >
                {message}
            </Snackbar>
        </View>
    );
};
