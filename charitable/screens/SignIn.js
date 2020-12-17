import React, { useState } from "react";

import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = (e) => {
        //...
    };
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                textContentType="password"
            />
            <Button
                onPress={submit}
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
