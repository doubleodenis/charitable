const styled = require('styled-components');
import React from 'react'
import { View, StyleSheet  } from "react-native";  
import DisplayButton from '../components/DisplayButton'
import { useNavigation } from '@react-navigation/native';

const DonateFooter = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <DisplayButton buttonStyle={styles.searchBtn} textStyle={styles.btnText} text="Find Centers" onPress={() => navigation.navigate('Map')} />
            <View style={styles.separator}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 70, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#FFFBF8'
    },
    btnText: {
        color: 'white',
        fontSize: 20,
    },
    searchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 150,
        height: 40,
        backgroundColor: '#8BC178'
    },
    separator: {
        height: 1,
        width: '90%',
        backgroundColor: '#9B9B9B',
        position: 'absolute',
        top: 0
    },
});
export default DonateFooter;