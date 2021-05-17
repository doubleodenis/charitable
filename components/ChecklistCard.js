import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from "react-native";  
import AddTagsBar from './AddTagsBar';
import DonationList from './DonationList';
import SearchBar from './SearchBar';

const ChecklistCard = ({text, items}) => {
    const [userList, setUserList] = useState(items)
    const [manualTag, setManualTag] = useState("");
    const [searching, setSearching] = useState(false)

    return (
        <View style={styles.card}>
                <Text style={styles.cardText}>{text}</Text>
                <SearchBar setSearching={setSearching}/>
                {searching?
                    null
                :
                <>
                    <DonationList 
                        userList={userList} 
                        setUserList={setUserList}
                    />
                    <Text style={styles.note}>Can’t find a tag that describes your items? Use the input below to add items manually</Text>
                    <AddTagsBar 
                        manualTag={manualTag} 
                        setManualTag={setManualTag} 
                        userList={userList} 
                        setUserList={setUserList}
                    />
                </>
                }
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 30,
        paddingBottom: 30,
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

export default ChecklistCard;