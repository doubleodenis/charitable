import React from "react";

import { StyleSheet, TouchableWithoutFeedback, Keyboard, Text, View} from 'react-native';
import DisplayButton from '../components/DisplayButton'
import { SafeAreaView } from "react-native-safe-area-context";
import ChecklistCard from "../components/ChecklistCard";

const dummyData = ['Clothes', 'Furniture', 'Electronics', 'Sanitary Products']

const Donate = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{backgroundColor: '#FFFBF8', height: '100%', alignItems: 'center'}}>
                <ChecklistCard text= 'What are you donating?' items={dummyData}/>
                <DisplayButton buttonStyle={styles.nextBtn} textStyle={styles.btnText} onPress={() => navigation.push('Mission')}>Also search by mission statement</DisplayButton>
                <View style={{alignItems: 'flex-start', width: '80%'}}>
                    <Text style={styles.note}>Items will be saved</Text>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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

export default Donate;