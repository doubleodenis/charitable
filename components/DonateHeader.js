const styled = require('styled-components');
import React from 'react'
import { View, Text, StyleSheet, Platform  } from "react-native";  

const DonateHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>Search</Text>
            <View style={styles.separator}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        ...Platform.select({
            ios: {
                height: '100%',
            },
            android: {
              height: 60,
            },
        }),
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center'
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