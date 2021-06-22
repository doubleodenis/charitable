/**
 * This button makes you go back in the stack. Generally meant for heading buttons on top right or left of the screen.
 */

 import React from "react";
 import { TouchableOpacity, Text } from "react-native"; 
import Icon from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
 const BackButton = () => {
    let navigation = useNavigation();
    return  (
        <TouchableOpacity style={{ padding: 10, marginLeft: 15 }} onPress={() => {
            navigation.goBack();
        }}>
            <Icon title="back" name="chevron-left" size={20} color="#9B9B9B" />
        </TouchableOpacity>
    )
}

export default BackButton;
 