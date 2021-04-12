const styled = require('styled-components');

import { TouchableOpacity, Text } from "react-native";  

const DisplayButton = (text, colorHex="#841584", onPress, textColor='white') => {
    return (
        <TouchableOpacity
            style={{...styles.button, backgroundColor: colorHex }}
            onPress={onPress}
        >
            <Text style={{...styles.text, color: textColor}}>{text}</Text>
        </TouchableOpacity>
    );
}

StyleSheet.create({
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