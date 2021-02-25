import React, { useState } from "react";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        //...
    };
    
    return (
        <SafeAreaView style={styles.container}>

            <TextInput
                type="email"
                style={{
                    width: "100%",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoFocus
                keyboardType="email-address"
                textContentType="emailAddress"
            />

            <TextInput
                type="email"
                style={{
                    width: "100%",
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                }}
                onChange={(e) => setConfirmEmail(e.target.value)}
                value={confirmEmail}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                textContentType="password"
            />
            <Button
                onPress={submit}
                title="Sign Up"
                color="#841584"
                accessibilityLabel="Press here to sign Up"
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

export default SignUp;
