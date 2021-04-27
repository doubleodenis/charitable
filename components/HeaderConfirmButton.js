
import React from 'react';
import { Text, Button } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderConfirmButton = () => {
    let navigation = useNavigation();
    return (
        <TouchableOpacity style={{ marginRight: 15, padding: 8, borderRadius: 20, backgroundColor: '#8BC178' }} onPress={() => {
            navigation.navigate('VendorPage');
        }}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600'}}>Looks Good</Text>
        </TouchableOpacity> 
    )
}

export default HeaderConfirmButton;