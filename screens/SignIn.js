import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../services/auth";
import { useNavigation } from '@react-navigation/native';
import SecureStorage from '../services/secureStorage';


const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigation = useNavigation();


    useEffect(() => {
        //check if already logged in, if so, navigate to organization page
        SecureStorage.getValue('token').then(res => {
            navigation.goBack();
        })
    }, [])

    function login() {
        const data = {
            email,
            password
        }

        AuthService.login(data).then(res => {
            SecureStorage.storeValue('token', res.data.token).then(done => {
                //navigate back
                navigation.goBack();
            })
            .catch(err => console.log('err', err))
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Brand logo here */}
            <Text>Charitable</Text>

            <TextInput
                type="email"
                style={{
                    width: "100%",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
                autoFocus
                keyboardType="email-address"
                textContentType="emailAddress"
            />

            <TextInput
                style={{
                    width: "100%",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                textContentType="password"
                autoCompleteType="password"
                secureTextEntry
            />
            
            <Button
                onPress={login}
                title="Sign In"
                color="#841584"
                accessibilityLabel="Press here to sign in"
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default SignIn;
