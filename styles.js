import React from "react";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    //Brown bar display button
    barButton: {
        backgroundColor: "#D77944",
        marginVertical: 5,
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        width: '100%'
    },
    barButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "300",
        textAlign: "center",
    },
    //Background colors
    primaryBrown: {
        backgroundColor: "#D77944"
    },
    secondaryGreen: {
        backgroundColor: "#8BC178"
    },
    textPrimaryColor: {
        color: "#706052"
    }
});
export default globalStyles;