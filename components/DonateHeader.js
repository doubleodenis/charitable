const styled = require('styled-components');
import React from 'react'
import { View, Text, StyleSheet  } from "react-native";  

const DonateHeader = () => {
    return (
        <View style={{height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.textStyle}>Search</Text>
            <View style={styles.separator}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#9B9B9B',
        fontSize: 24,
        width: '100%'
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