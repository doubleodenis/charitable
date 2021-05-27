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
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../services/auth";
import { useNavigation } from "@react-navigation/native";
import SecureStorage from "../services/secureStorage";
import PrimaryInput from "../components/PrimaryInput";
import DisplayButton from "../components/DisplayButton";
import Link from '../components/Link'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigation = useNavigation();

    useEffect(() => {
        //check if already logged in, if so, navigate to organization page
        // SecureStorage.getValue('token').then(res => {
        //     navigation.goBack();
        // })
    }, []);

    function login() {
        const data = {
            email,
            password,
        };

        AuthService.login(data)
            .then((res) => {
                SecureStorage.storeValue("token", res.data.token)
                    .then((done) => {
                        //navigate back
                        navigation.goBack();
                    })
                    .catch((err) => console.log("err", err));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <View style={styles.container}>
            {/* Brand logo here */}

            <View>
                <Text style={styles.header}>Charitable</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ width: '100%', justifyContent: 'flex-start' }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <PrimaryInput
                            placeholder="Email"
                            type="email"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />

                        <PrimaryInput
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            textContentType="password"
                            autoCompleteType="password"
                            secureTextEntry
                        />

                        <DisplayButton
                            onPress={login}
                            buttonStyle={styles.displayButton}
                            textStyle={styles.buttonText}
                        >
                            Sign In
                        </DisplayButton>
                        <Link style={{textAlign: 'center', alignItems: 'center'}} navigateTo={'Sign Up'}>Or sign up here</Link>
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
        padding: "8%"
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
        alignContent: 'center',
        // flexDirection: 'column',
        // alignItems: 'center',
        textAlign: 'center',
        height: 250,
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
