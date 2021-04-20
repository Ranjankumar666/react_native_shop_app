import React, { useEffect, useReducer, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Appbar,
    Title,
    Button,
    TextInput,
    Card,
    HelperText,
    Caption,
} from "react-native-paper";
import { NavConfig } from "../../Constants/NavConfig";
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../../store/actions/auth";

const { Navigator, Screen } = createStackNavigator();

const reducer = (state, action) => {
    if (action.type === "UPDATE") {
        const inputValues = {
            ...state.inputValues,
            [action.title]: action.value,
        };

        const inputValid = {
            ...state.inputValid,
            [action.title]: action.valid,
        };

        return {
            inputValues,
            inputValid,
            formIsValid: Object.values(inputValid).every(
                (item) => item === true
            ),
        };
    }

    return state;
};

export const AuthScreen = (props) => {
    const { type } = props.route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const [state, formDispatch] = useReducer(reducer, {
        inputValues: {
            email: "",
            password: "",
        },
        inputValid: {
            email: false,
            password: false,
        },
        formIsValid: false,
    });

    const handleText = (text, title) => {
        const isValid = text.trim().length > 0;

        formDispatch({ type: "UPDATE", value: text, valid: isValid, title });
    };

    const dispatchAuth = async (fn) => {
        if (!state.formIsValid) {
            Alert.alert(
                "Invalid Credentials",
                "Fill the credentials correctly",
                [
                    {
                        text: "Dismiss",
                    },
                ]
            );

            return;
        }
        try {
            setIsLoading(true);

            await dispatch(
                fn(state.inputValues.email, state.inputValues.password)
            );
            props.navigation.navigate("Home");
        } catch (err) {
            console.log("AUTH COMPONENTE",err);
            setIsLoading(false);
            setError({ message: "Something went wrong" });
        }
    };

    if (error)
        Alert.alert("Error", error.message, [
            {
                text: "Dismiss",
            },
        ]);

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={100}
            style={{
                flex: 1,
            }}
        >
            <ScrollView style={styles.screen}>
                <Card>
                    <Card.Content>
                        <Title
                            style={{
                                textAlign: "center",
                            }}
                        >
                            {type !== "signup"
                                ? "Sign in to your account"
                                : "Sign up and enjoy"}
                        </Title>
                        <View>
                            <TextInput
                                style={styles.input}
                                mode="flat"
                                label="Email"
                                keyboardType="email-address"
                                autoCompleteType="email"
                                autoCapitalize="none"
                                // textContentType="emailAddress"
                                value={state.inputValues.email}
                                onChangeText={(text) =>
                                    handleText(text, "email")
                                }
                            />
                            <HelperText
                                visible={!state.inputValid.email}
                                type="error"
                            >
                                Email is invalid
                            </HelperText>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                mode="flat"
                                label="Password"
                                secureTextEntry={true}
                                autoCompleteType="email"
                                autoCapitalize="none"
                                textContentType="password"
                                value={state.inputValues.password}
                                onChangeText={(text) =>
                                    handleText(text, "password")
                                }
                            />
                        </View>

                        <View style={styles.btnContainer}>
                            <Button
                                mode="contained"
                                loading={isLoading}
                                onPress={async () => {
                                    if (type === "signup") dispatchAuth(signUp);
                                    else dispatchAuth(signIn);
                                }}
                            >
                                {type === "signup" ? "Sign Up" : "Sign In"}
                            </Button>
                            <Button
                                compact={true}
                                mode="text"
                                onPress={() => {
                                    let route = "Sign Up";
                                    if (type === "signup") {
                                        route = "Log In";
                                    }

                                    props.navigation.navigate(route);
                                }}
                            >
                                <Caption>
                                    {type === "signup"
                                        ? "Already Have account? Sign in?"
                                        : "New ? Sign Up"}
                                </Caption>
                            </Button>
                        </View>
                    </Card.Content>
                </Card>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export const AuthNavigator = () => {
    return (
        <Navigator screenOptions={NavConfig}>
            <Screen
                name="Log In"
                component={AuthScreen}
                initialParams={{ type: "signin" }}
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
                name="Sign Up"
                component={AuthScreen}
                initialParams={{ type: "signup" }}
            />
        </Navigator>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 5,
    },
    input: {
        backgroundColor: "white",
        marginBottom: 5,
    },
    btnContainer: {
        marginTop: 5,
    },
});
