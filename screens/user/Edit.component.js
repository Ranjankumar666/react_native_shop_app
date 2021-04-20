import React, { useEffect, useReducer, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    StyleSheet,
    View,
} from "react-native";
import {
    Button,
    HelperText,
    IconButton,
    TextInput,
    Title,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../Constants/Colors";
import { createProduct, updateProduct } from "../../store/actions/product";
import { Message } from "../shop/Home.component";

const formReducer = (state, action) => {
    if (action.type === "UPDATE") {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };

        const updatedValidities = {
            ...state.inputValid,
            [action.input]: action.isValid,
        };
        return {
            ...state,
            inputValues: updatedValues,
            inputValid: updatedValidities,
            formIsValid: Object.values(updatedValidities).every(
                (e) => e === true
            ),
        };
    }

    return state;
};

const FormSubmissionIndicator = () => {
    return (
        <Message>
            <ActivityIndicator
                size="large"
                color={Colors.indigo}
                animating={true}
            />
        </Message>
    );
};

export const EditProduct = ({ navigation, route }) => {
    const { id } = route.params;
    const { userProducts } = useSelector((state) => state.products);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    /**Get the specifivc item first for default inputs */
    let editProduct;
    if (id) {
        editProduct = userProducts.filter((item) => item.id === id)[0];
    }
    /**State Management */
    const [state, formDispatch] = useReducer(formReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : "",
            description: editProduct ? editProduct.description : "",
            price: editProduct ? editProduct.price : "",
            imageUrl: editProduct ? editProduct.imageUrl : "",
        },
        inputValid: {
            title: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,
            imageUrl: editProduct ? true : false,
        },
        formIsValid: editProduct ? true : false,
    });

    const textChangeHandler = (inputType, text) => {
        let isValid = text.trim().length > 0 ? true : false;

        formDispatch({
            type: "UPDATE",
            value: text,
            isValid,
            input: inputType,
        });
    };

    /**Data  Handlers And Setters */
    const updateData = async () => {
        const { formIsValid } = state;

        if (!formIsValid) {
            Alert.alert("Invalid credentials", "Check yout inputs", [
                {
                    text: "Dismiss",
                },
            ]);
            return;
        }
        const { inputValues } = state;

        try {
            setIsLoading(true);
            await dispatch(updateProduct(id, inputValues));
            navigation.navigate("Your Products");
        } catch (err) {
            console.log("UPDATE ITEM",err.message);
            setIsLoading(false);
            setError({
                message: "Something went wrong",
            });
        }
    };

    const createItem = async () => {
        const { formIsValid } = state;

        if (!state.formIsValid) {
            Alert.alert("Invalid credentials", "Check yout inputs", [
                {
                    text: "Dismiss",
                },
            ]);
            return;
        }
        const { title, price, description, imageUrl } = state.inputValues;

        try {
            setIsLoading(true);
            await dispatch(
                createProduct({
                    title,
                    description,
                    imageUrl,
                    price,
                })
            );
            navigation.navigate("Your Products");
        } catch (err) {
            console.log("CREATE ITEM ERROR",err.message);
            setIsLoading(false);
            setError({ message: "Something Went Wrong" });
        }
    };

    if (isLoading) {
        return <FormSubmissionIndicator />;
    }

    if (error)
        Alert.alert("Error", error.message, [
            {
                type: "Dismiss",
            },
        ]);
    // useEffect(() => {

    // }, [error]);

    /** Component */
    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={100}
            style={{ flex: 1 }}
        >
            {/* <Provider> */}
            <View style={{ padding: 5 }}>
                <View>
                    <TextInput
                        label="Title"
                        value={state.inputValues.title}
                        onChangeText={(text) =>
                            textChangeHandler("title", text)
                        }
                        style={styles.input}
                        autoCapitalize="sentences"
                        autoCorrect
                        autoCorrect
                        autoFocus
                        returnKeyType="next"
                    />
                    <HelperText type="error" visible={!state.inputValid.title}>
                        Title can't be invalid
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        label="Description"
                        value={state.inputValues.description}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) =>
                            textChangeHandler("description", text)
                        }
                        style={styles.input}
                        returnKeyType="next"
                    />
                    <HelperText
                        type="error"
                        visible={!state.inputValid.description}
                    >
                        Description can't be empty
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        keyboardType="decimal-pad"
                        label="Price"
                        value={String(state.inputValues.price)}
                        onChangeText={(text) =>
                            textChangeHandler("price", text)
                        }
                        style={styles.input}
                        returnKeyType="next"
                        // selectionColor={Colors.indigo}
                    />
                    <HelperText type="error" visible={!state.inputValid.price}>
                        Price can't be empty
                    </HelperText>
                </View>

                <View>
                    <TextInput
                        label="Image Url"
                        value={state.inputValues.imageUrl}
                        onChangeText={(text) =>
                            textChangeHandler("imageUrl", text)
                        }
                        style={styles.input}
                        returnKeyType="next"
                        onSubmitEditing={id ? updateData : createItem}
                    />
                    <HelperText
                        type="error"
                        visible={!state.inputValid.imageUrl}
                    >
                        imageUrl can't be invalid
                    </HelperText>
                </View>

                <Button
                    mode="contained"
                    style={{ backgroundColor: Colors.indigo }}
                    onPress={id ? updateData : createItem}
                >
                    {id ? "Update" : "Create"}
                </Button>
            </View>
            {/* </Provider> */}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    input: { marginBottom: 5, backgroundColor: "white" },
});
