const styled = require('styled-components');
import React from 'react'
import { TouchableOpacity, Text, StyleSheet  } from "react-native";  
import { useNavigation } from '@react-navigation/native';

const ExitButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Map')}
        >
            <Text style={styles.text}>X</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        width: '85%',
        height: 30,
        marginRight: 20
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#9B9B9B'
    }
});
export default ExitButton;