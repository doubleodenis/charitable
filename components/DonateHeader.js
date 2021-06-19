const styled = require('styled-components');
import React from 'react'
import { View, Text, StyleSheet, Platform  } from "react-native";  
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';


const DonateHeader = () => {
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get('window').width;
    return (
        <View style={[styles.container, 
            {
                width: screenWidth*0.9,
                ...Platform.select({
                    ios: {
                        // ios height is based on height in StackScreens.js
                        height: '100%',
                    },
                    android: {
                        height: 60,
                    },
                })}
        ]}>
            <Text style={styles.textStyle}>Search</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#9B9B9B'
    },
    textStyle: {
        color: '#9B9B9B',
        fontSize: 24,
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    separator: {
        height: 1,
        width: 375,
        backgroundColor: '#9B9B9B',
        position: 'absolute',
        bottom: 0
    }
});
export default DonateHeader;