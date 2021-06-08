import React, { useState } from "react";

import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/Charitable_Logo.png"


const Loading = () => {
   
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.brand}>
                <Image source={logo} style={styles.image}/>
                <Text style={styles.name}>Charitable</Text>
            <View style={{marginTop: 30}}>
                <ActivityIndicator size="large" color="#AEAEAE" animating={true}/>
            </View>
            
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        backgroundColor: "#FFFBF8", //Main color?
        alignItems: "center",
        justifyContent: "space-around",
    },
    name: {
        color: "#D77944",
        fontSize: 36,
        fontWeight: "300"
    },
    brand: {
        flex: 1,
        // justifyContent: 'space-around',
        maxHeight: 200,
        alignItems: 'center'
    },
    image: {
        height: 145,
        width: 120
    }
});

export default Loading;
