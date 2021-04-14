const styled = require('styled-components');
import React from 'react'
import { TouchableOpacity, Text, StyleSheet  } from "react-native";  

const DisplayButton = ({text, buttonStyle, textStyle, onPress}) => {
    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
        >
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        width: '85%',
        height: 30
    },
    text: {
        fontSize: 12
    }
});
export default DisplayButton;