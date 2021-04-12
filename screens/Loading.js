import React, { useState } from "react";

import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Loading = () => {
   
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.brand}>
                <Text style={styles.name}>Charitable</Text>
                <View style={styles.image}></View>
            </View>
            <ActivityIndicator size="large" color="#097a36" animating={true} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#FFBC74", //Main color?
        alignItems: "center",
        justifyContent: "space-around",
    },
    name: {
        color: "#097a36",
        fontSize: 28,
        fontWeight: "300"
    },
    brand: {
        flex: 1,
        // justifyContent: 'space-around',
        maxHeight: 200,
        alignItems: 'center'
    },
    image: {
        marginTop: 25,
        height: 100,
        width: 100,
        backgroundColor:"#098A3C",
    }
});

export default Loading;
