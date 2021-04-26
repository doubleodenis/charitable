const styled = require('styled-components');
import React from 'react'
import { TouchableOpacity, Text, StyleSheet  } from "react-native";  
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ExitButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
        >
            <Icon name="times" size={30} color="#900" style={styles.text}/>
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