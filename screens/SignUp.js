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
    const [emailErr, setEmailErr] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState(null);
    
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
    
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
            console.log('sign up success', res)
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
                    setEmailErr(e.msg);
                }
                else if(e.param == "password") {
                    setPasswordErr(e.msg);
                    setConfirmPasswordErr(e.msg);
                }
            })
        })
    }
    
    function setFormField(setter, value, errSetter) {
        setter(value);
        errSetter(false);
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
                        <View style={styles.formField}>
                            <PrimaryInput
                                type="email"
                                placeholder="Email"
                                onChangeText={(text) => setFormField(setEmail, text, setEmailErr)}
                                value={email}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                returnKeyType='next'
                                error={emailErr}
                            />
                            <Text style={styles.formFieldErr}>{emailErr}</Text>
                        </View>

                        <View style={styles.formField}>
                            <PrimaryInput
                                placeholder="Password"
                                onChangeText={(text) => setFormField(setPassword, text, setPasswordErr)}
                                value={password}
                                textContentType="password"
                                autoCompleteType="password"
                                secureTextEntry
                                error={passwordErr}
                                returnKeyType='done'
                                onSubmitEditing={(event) => {
                                    signUp();
                                }}
                            />
                            <Text style={styles.formFieldErr}>{passwordErr}</Text>
                        </View>
                        
                        <View style={styles.formField}>
                            <PrimaryInput
                                placeholder="Confirm Password"
                                onChangeText={(text) => setFormField(setConfirmPassword, text, setConfirmPasswordErr)}
                                value={confirmPassword}
                                textContentType="password"
                                autoCompleteType="password"
                                secureTextEntry
                                error={confirmPasswordErr}
                            />
                            <Text style={styles.formFieldErr}>{confirmPasswordErr}</Text>
                        </View>

                        <View style={styles.formField}>
                            <DisplayButton
                                onPress={signUp}
                                buttonStyle={styles.displayButton}
                                textStyle={styles.buttonText}
                            >
                                Sign Up
                            </DisplayButton>
                        </View>
                        
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
    formField: {
        marginBottom: 12
    },  
    formFieldErr: {
        fontSize: 12,
        color: 'red',
        paddingVertical: 4
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
