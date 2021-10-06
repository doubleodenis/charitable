import React, {useState, useEffect,useRef} from 'react'
import { View, Text, StyleSheet, Animated, KeyboardAvoidingView } from "react-native";  
import DonationList from './DonationList';
import SearchList from './SearchList'
import SearchBar from './SearchBar';
import secureStorage from '../services/secureStorage';


const DonationListCard = ({isUser, searching, setSearching}) => {

    const [itemList, setItemList] = useState([])
    const [missionList, setMissionList] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [searchPressed, setSearchPressed] = useState(false);

    useEffect(() => {
        
        secureStorage.getValue(isUser?"itemList":"centerItemList").then((value) => {
            setItemList(JSON.parse(value))
        }).catch((err) => {
            console.log(err)
        })

        secureStorage.getValue(isUser?"missionList":"centerMissionList").then((value) => {
            setMissionList(JSON.parse(value))
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        secureStorage.storeValue((isUser?"itemList":"centerItemList"), JSON.stringify(itemList))
        .then((res) => {
            console.log('stored items');
        }, (err) => {
            console.log('error');
        });
    }, [itemList]);

    useEffect(() => {
        secureStorage.storeValue((isUser?"missionList":"centerMissionList"), JSON.stringify(missionList))
        .then((res) => {
            console.log('stored missions');
        }, (err) => {
            console.log('error');
        });
    }, [missionList]);

    return (
        <View style={[styles.card, {height: (searching? '100%' : 'auto'), borderBottomRightRadius: (searching? 0 : 10), borderBottomLeftRadius: (searching? 0 : 10)}]}> 
                <Text style={styles.cardText}>{isUser? 'What are you donating?' : 'What are you accepting?'}</Text>
                <SearchBar 
                    searching={searching} 
                    setSearching={setSearching} 
                    searchQuery={searchQuery} 
                    setSearchQuery={setSearchQuery} 
                    setSearchPressed={setSearchPressed}
                />
                {searching ?
                    <SearchList 
                        isUser={isUser}
                        itemList={itemList} 
                        setItemList={setItemList}
                        missionList={missionList}
                        setMissionList={setMissionList}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchPressed={searchPressed}
                        setSearchPressed={setSearchPressed}
                    />
                :
                <>
                    <DonationList 
                        isUser={isUser}
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
        marginBottom: 10,
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