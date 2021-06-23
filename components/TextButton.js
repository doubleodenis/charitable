
import React from 'react';
import { Text, Button } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const TextButton = ({ style, navigateTo, children, ...props }) => {
    let navigation = useNavigation();

    function onPress() {
        if(!!navigateTo == true) {
            if(typeof navigateTo === "string") 
            navigation.navigate(navigateTo);
            else
            {
                //This option is if you need the advanced option of moving to a different stack
                // https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation
                navigation.navigate(navigateTo[0], { screen: navigateTo[1] })
            }
        }
    }

    return (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={props.onPress} onPressOut={onPress}>
            <Text style={{ fontSize: 18, color: "#9B9B9B" }}>{children}</Text> 
        </TouchableOpacity> 
    )
}

export default TextButton;