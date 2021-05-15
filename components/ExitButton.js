const styled = require('styled-components');
import React from 'react'
import { TouchableOpacity, Text, StyleSheet  } from "react-native";  
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconButton from './IconButton';

const ExitButton = () => {
    const navigation = useNavigation();
    return (
        <IconButton
            buttonStyle={styles.button}
            iconStyle={styles.text}
            onPress={() => navigation.goBack()}
            icon='times'
        />
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