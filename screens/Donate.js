import React from "react";

import { StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native';
import DisplayButton from '../components/DisplayButton'
import { SafeAreaView } from "react-native-safe-area-context";
import ChecklistCard from "../components/ChecklistCard";

const dummyData = ['Clothes', 'Furniture', 'Electronics', 'Sanitary Products']

const Donate = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{backgroundColor: '#FFFBF8', height: '100%', alignItems: 'center'}}>
                <ChecklistCard text= 'What are you donating?' items={dummyData}/>
                <DisplayButton buttonStyle={styles.nextBtn} textStyle={styles.btnText} text="Also search by mission statement" onPress={() => navigation.push('Mission')} />
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

    }
});

export default Donate;