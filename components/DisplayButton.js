import React from "react";
import { TouchableOpacity, Text } from "react-native";

const DisplayButton = ({ text, buttonStyle, textStyle, onPress }) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

export default DisplayButton;
