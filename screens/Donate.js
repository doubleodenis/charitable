import React, {useState} from "react";

import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView} from 'react-native';
import DisplayButton from '../components/DisplayButton'
import { SafeAreaView } from "react-native-safe-area-context";
import DonationListCard from "../components/DonationListCard";
import { ScrollView } from "react-native-gesture-handler";

const dummyData = []
const dummyMissions = []

const Donate = ({navigation}) => {
    const [searching, setSearching] = useState(false)

    return (
        <View style={{backgroundColor: '#FFFBF8', height: '100%', width: '100%', flex: 1}}>
            <ScrollView 
                keyboardDismissMode='on-drag'
                scrollEnabled={!searching}
                keyboardShouldPersistTaps={"handled"}
                contentContainerStyle={{height: (searching? '100%' : 'auto')}}
            >
                <View style={{alignItems: 'center', paddingTop: 20}}>
                    <DonationListCard isUser={true} items={dummyData} missions={dummyMissions} searching={searching} setSearching={setSearching}/>
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