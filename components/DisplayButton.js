import React from "react";
import { TouchableOpacity, Text } from "react-native";

const DisplayButton = ({buttonStyle, textStyle, onPress, children}) => {
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={textStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

export default DisplayButton;
