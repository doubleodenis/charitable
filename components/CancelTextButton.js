
import React from 'react';
import { Text, Button } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CancelTextButton = () => {
    let navigation = useNavigation();
    return (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => {
            navigation.navigate('VendorPage');
        }}>
            <Text style={{ fontSize: 18, color: "#9B9B9B" }}>Cancel</Text> 
        </TouchableOpacity> 
    )
}

export default CancelTextButton;