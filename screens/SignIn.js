import React, { useEffect, useState } from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from "react-native";
import AuthService from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import SecureStorage from "../services/secureStorage";
import PrimaryInput from "../components/PrimaryInput";
import DisplayButton from "../components/DisplayButton";
import Link from "../components/Link";

import AuthConsumer, { AuthContext } from "../contexts/AuthContext";

import { showMessage, hideMessage } from "react-native-flash-message";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(null);

    let navigation = useNavigation();

    let ctx = React.useContext(AuthContext);

    useEffect(() => {
        //check if already logged in, if so, navigate to organization page
        SecureStorage.getValue("token")
            .then((res) => {
                navigation.goBack();
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function login() {
        const data = {
            email,
            password,
        };

        ctx.signIn(data)
            .then((res) => {
                showMessage({
                    message: "Successfully logged in",
                    type: "success",
                    duration: 5000,
                });
                navigation.goBack();
            })
            .catch((err) => {
                console.log("sign in err", err);

                //Show error message
                showMessage({
                    message: err.message,
                    type: "danger",
                    duration: 5000,
                });

                if (err.data?.length > 0) {
                    err.data.forEach((e) => {
                        if (e.param == "email") {
                            setEmailErr(e.msg);
                        } else if (e.param == "password") {
                            setPasswordErr(e.msg);
                        }
                    });
                }
            });
    }

    function setFormField(setter, value, errSetter) {
        setter(value);
        errSetter(false);
    }

    return (
        <View style={styles.container}>
            {/* Brand logo here */}

            <View>
                <Text style={styles.header}>Charitable</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ width: "100%", justifyContent: "flex-start" }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <View style={styles.formField}>
                            <PrimaryInput
                                placeholder="Email"
                                type="email"
                                onChangeText={(text) =>
                                    setFormField(setEmail, text, setEmailErr)
                                }
                                value={email}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                error={emailErr}
                            />
                            <Text style={styles.formFieldErr}>{emailErr}</Text>
                        </View>

                        <View style={styles.formField}>
                            <PrimaryInput
                                placeholder="Password"
                                onChangeText={(text) =>
                                    setFormField(
                                        setPassword,
                                        text,
                                        setPasswordErr
                                    )
                                }
                                value={password}
                                textContentType="password"
                                autoCompleteType="password"
                                secureTextEntry
                                error={passwordErr}
                            />
                            <Text style={styles.formFieldErr}>
                                {passwordErr}
                            </Text>
                        </View>
                        <DisplayButton
                            onPress={login}
                            buttonStyle={styles.displayButton}
                            textStyle={styles.buttonText}
                        >
                            Sign In
                        </DisplayButton>

                        <Link
                            style={{
                                textAlign: "center",
                                alignItems: "center",
                            }}
                            navigateTo={"Sign Up"}
                        >
                            Or sign up here
                        </Link>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "8%",
    },
    header: {
        fontSize: 32,
        fontWeight: "600",
        marginBottom: 5,
        color: "#311700",
    },
    form: {
        display: "flex",
        justifyContent: "space-evenly",
        alignContent: "center",
        // flexDirection: 'column',
        // alignItems: 'center',
        textAlign: "center",
        height: 250,
    },
    formField: {
        marginBottom: 12,
    },
    formFieldErr: {
        fontSize: 12,
        color: "red",
        paddingVertical: 4,
    },
    displayButton: {
        backgroundColor: "#D77944",
        marginVertical: 5,
        // justifyContent: 'center',
        // textAlign: 'center',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "300",
        textAlign: "center",
    },
});

export default SignIn;
