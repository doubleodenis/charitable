
import React from 'react';
import { Text } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ConfirmButton = () => {
    let navigation = useNavigation();

    function onPress() {
        if(typeof navigateTo === "string") 
            navigation.navigate(navigateTo);
        else
        {
            //This option is if you need the advanced option of moving to a different stack
            // https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation
            navigation.navigate(navigateTo[0], navigateTo[1])
        }
    }

    return (
        <TouchableOpacity style={{ marginRight: 15, padding: 8, borderRadius: 20, backgroundColor: '#8BC178' }} 
            onPress={onPress}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: '600'}}>Looks Good</Text>
        </TouchableOpacity> 
    )
}

export default ConfirmButton;