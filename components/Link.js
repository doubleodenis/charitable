import React from "react";

import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Link = ({children, style, navigateTo}) => {
    
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
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={{ textDecorationLine: 'underline', fontWeight: '600' }}>{children}</Text>
        </TouchableOpacity>
    );
};

export default Link;
