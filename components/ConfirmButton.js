import React, { Children } from "react";
import { Text, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConfirmButton = ({ children, navigateTo }) => {
    let navigation = useNavigation();

    function onPress() {
        if (typeof navigateTo === "string") navigation.navigate(navigateTo);
        else {
            //This option is if you need the advanced option of moving to a different stack
            // https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation
            navigation.navigate(navigateTo[0], { screen: navigateTo[1] })
        }
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 15,
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#8BC178",
        minWidth: 75,
        display: "flex",
        alignItems: "center",
    },
    text: { color: "white", fontSize: 14, fontWeight: "600" },
});

export default ConfirmButton;
