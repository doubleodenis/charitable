import React, {useState, useEffect,useRef} from 'react'
import { View, Text, StyleSheet, Animated, KeyboardAvoidingView } from "react-native";  
import DonationList from './DonationList';
import SearchList from './SearchList'
import SearchBar from './SearchBar';

const DonationListCard = ({text, items, missions, searching, setSearching}) => {

    const [itemList, setItemList] = useState(items)
    const [missionList, setMissionList] = useState(missions)
    const [manualTag, setManualTag] = useState("");

    return (
        <View style={[styles.card, {height: (searching? '100%' : 'auto'), borderBottomRightRadius: (searching? 0 : 10), borderBottomLeftRadius: (searching? 0 : 10)}]}> 
                <Text style={styles.cardText}>{text}</Text>
                <SearchBar searching={searching} setSearching={setSearching}/>
                {searching ?
                    <SearchList 
                        itemList={itemList} 
                        setItemList={setItemList}
                    />
                :
                <>
                    <DonationList 
                        itemList={itemList} 
                        missionList={missionList}
                        setItemList={setItemList}
                        setMissionList={setMissionList}
                    />
                </>
                }
        </View>
        
    );
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        width: '80%',
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,  
        elevation: 5
    },
    cardText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#311700'
    },
    note: {
        fontSize: 12,
        color: '#706052',
    },
});

export default DonationListCard;