import React, { useState, useEffect } from "react";

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

import { useNavigation } from "@react-navigation/native";
import SecureStorage from "../services/secureStorage";
import PrimaryInput from "../components/PrimaryInput";
import DisplayButton from "../components/DisplayButton";
import Link from '../components/Link'

import AuthConsumer, { AuthContext } from '../contexts/AuthContext';

import { showMessage, hideMessage } from "react-native-flash-message";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(false);
    
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
    
    let navigation = useNavigation();
    let ctx = React.useContext(AuthContext);

    useEffect(() => {
        //check if already logged in, if so, navigate to organization page
        SecureStorage.getValue('token').then(res => {
            navigation.goBack();
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

     function signUp() {
        const data = {
            email,
            password,
        };

        if(password != confirmPassword) {
            //Return error message validation
            setConfirmPasswordErr(true);

            showMessage({
                message: "Passwords do not match.",
                type: "danger",
            });

            return;
        }

        ctx.signUp(data).then(res => {
            showMessage({
                message: "Successfully signed up",
                type: "success",
                duration: 5000
            });
            navigation.goBack();
        })
        .catch(err => {
            console.log('signup', err);

            //Show error message
            showMessage({
                message: err.message,
                type: "danger",
            });

            err.data.forEach(e => {
                if(e.param == "email") {
                    setEmailErr(true);
                }
                else if(e.param == "password") {
                    setPasswordErr(true);
                }
            })
        })
    }
    
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.header}>Sign Up for Charitable</Text>
            </View>

            <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.form}>
                        <PrimaryInput
                            type="email"
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            error={emailErr}
                        />

                        <PrimaryInput
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            textContentType="password"
                            autoCompleteType="password"
                            secureTextEntry
                            error={passwordErr}
                        />
                        <PrimaryInput
                            placeholder="Confirm Password"
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                            textContentType="password"
                            autoCompleteType="password"
                            secureTextEntry
                            error={confirmPasswordErr}
                        />

                        <DisplayButton
                            onPress={signUp}
                            buttonStyle={styles.displayButton}
                            textStyle={styles.buttonText}
                        >
                            Sign Up
                        </DisplayButton>
                        <Link style={{textAlign: 'center', alignItems: 'center'}} navigateTo={'Sign In'}>Or sign in here</Link>
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
        textAlign: 'center',
        height: 250,
    },
    displayButton: {
        backgroundColor: "#D77944",
        marginVertical: 5,
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

export default SignUp;
