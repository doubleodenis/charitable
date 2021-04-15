import { NavigationHelpersContext } from "@react-navigation/core";
import React, { useState } from "react";

import { StyleSheet, View} from 'react-native';
import DisplayButton from '../components/DisplayButton'
import { SafeAreaView } from "react-native-safe-area-context";
import ChecklistCard from "../components/ChecklistCard";

const dummyData = ["Women's Shelter", "Homeless Shelter", 'Adoption']

const Mission = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor: '#FFFBF8', height: '100%', alignItems: 'center'}}>
            <View style={styles.separator}></View>
            <ChecklistCard text= 'What mission statements?' items={dummyData}/>
            <DisplayButton buttonStyle={styles.nextBtn} textStyle={styles.btnText} text="Edit items list" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '90%',
        backgroundColor: '#9B9B9B',
        position: 'absolute',
        top: 0
    },
    nextBtn: {
        backgroundColor: '#D77944',
        width: '80%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 10
    },
    btnText: {
        color: 'white',
        fontSize: 18

    }
});

export default Mission;