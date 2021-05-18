import React from "react";

import { StyleSheet, TouchableWithoutFeedback, Keyboard, View} from 'react-native';
import DisplayButton from '../components/DisplayButton'
import { SafeAreaView } from "react-native-safe-area-context";
import ChecklistCard from "../components/ChecklistCard";
import { ScrollView } from "react-native-gesture-handler";

const dummyData = ['Clothes', 'Furniture', 'Electronics', 'Sanitary Products', 'm' , 'm', 'm' , 'm', 'm' , 'm', 'm' , 'm', 'm' , 'm', 'm']

const Donate = ({navigation}) => {
    return (
        <View style={{backgroundColor: '#FFFBF8', height: '100%', width: '100%', flex: 1}}>
            <ScrollView 
                keyboardDismissMode='on-drag'
            >
                <View style={{alignItems: 'center', paddingVertical: 20}}>
                    <ChecklistCard text= 'What are you donating?' items={dummyData}/>
                </View>
            </ScrollView>
        </View>
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