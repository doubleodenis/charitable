import { NavigationHelpersContext } from "@react-navigation/core";
import React, { useState } from "react";

import { StyleSheet, View, Text} from 'react-native';
import DisplayButton from '../components/DisplayButton'
import { SafeAreaView } from "react-native-safe-area-context";
import ChecklistCard from "../components/ChecklistCard";

const dummyData = ["Women's Shelter", "Homeless Shelter", 'Adoption']

const Mission = ({navigation}) => {
    return (
        <SafeAreaView style={{backgroundColor: '#FFFBF8', height: '100%', alignItems: 'center'}}>
            <ChecklistCard text= 'What mission statements?' items={dummyData}/>
            <DisplayButton buttonStyle={styles.nextBtn} textStyle={styles.btnText} text="Edit items list" onPress={() => navigation.goBack()} />
            <View style={{alignItems: 'flex-start', width: '80%'}}>
                <Text style={styles.note}>Mission statements will be saved</Text>
            </View>
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

    },
    note: {
        fontSize: 12,
        color: '#706052',
        marginTop: 3,
        marginLeft: 7,
    }
});

export default Mission;