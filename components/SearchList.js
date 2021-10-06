import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Keyboard, Platform } from "react-native"; 
import IconButton from './IconButton'
import DisplayButton from './DisplayButton'
import AddTagsModal from './AddTagsModal';
import { ScrollView } from 'react-native-gesture-handler';
import {searchItem} from '../services/item.js'
import {searchMission} from '../services/mission.js'

const suggestedSearches=['Clothes', 'Furniture', 'Toys']
const suggestedMissions=['Homelessness', 'Foster Care', 'Mental Health']

const SearchList = ({isUser, itemList, setItemList, missionList, setMissionList, searchQuery, setSearchQuery, searchPressed, setSearchPressed}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [searchType, setSearchType] = useState('items')
    const [itemSearch, setItemSearch] = useState([])
    const [missionSearch, setMissionSearch] = useState([])
    const [searching, setSearching] = useState(false)
    const [searched, setSearched] = useState(false)
    const [failedQuery, setFailedQuery] = useState('')
    const keyboardDismissProp = Platform.OS === "ios" ? { keyboardDismissMode: "on-drag" } : { onScrollBeginDrag: Keyboard.dismiss };


    useEffect(() => {
        if(searchPressed){
            search(searchQuery)
            setSearchPressed(false)
        }
    }, [searchPressed]);

    useEffect(() => {
        setSearchPressed(true)
    }, [searchType]);

    useEffect(() => {
        //setSearched(false)
    }, [searchQuery]);


    const search = (query) => {
        let searchCopy = query.trim() + ''
        if(searchCopy.trim().length > 1)
        {
            setSearching(true)
            setSearched(true)
            if(searchType==='items') {
                searchItem(searchCopy)
                .then((data) => {
                    if(data.items.length === 0)
                        setFailedQuery(searchCopy)
                    setItemSearch(data.items)
                    setTimeout(()=>setSearching(false), 0.5*1000);
                })
                .catch((err) => {
                    console.log(err)
                    setTimeout(()=>setSearching(false), 0.5*1000);
                })
                // tempTags = items.filter(item => item.name.toLocaleUpperCase().includes(searchCopy.toLocaleUpperCase()) || item.keywords.filter(k => k.toLocaleUpperCase().includes(searchCopy.toLocaleUpperCase())).length > 0)
                // setItemSearch(tempTags)
            }
            else {
                searchMission(searchCopy)
                .then((data) => {
                    if(data.missions.length === 0)
                        setFailedQuery(searchCopy)
                    setMissionSearch(data.missions)
                    setTimeout(()=>setSearching(false), 0.5*1000);
                })
                .catch((err) => {
                    console.log(err)
                    setTimeout(()=>setSearching(false), 0.5*1000);
                })
            }
        }
        else if(searchCopy.trim().length === 0){
            setSearched(false)
        }
        else{
            alert("Search must be more than one character")
        }
    }

    const addTag = (tag) => {
        let listCopy;
        if(searchType==='items') 
            listCopy = [...itemList];
        else
            listCopy = [...missionList];
        
        listCopy.unshift(tag);
        
        if(searchType==='items')
            setItemList(listCopy);
        else
            setMissionList(listCopy);
    }

    const removeTag = (tag) => {
        let listCopy;
        if(searchType==='items') 
            listCopy = [...itemList];
        else
            listCopy = [...missionList]; 
        
        let index = listCopy.indexOf(tag);
        if (index > -1) 
            listCopy.splice(index, 1);

        if(searchType==='items')
            setItemList(listCopy) 
        else
            setMissionList(listCopy);
    }

    return (
            <View style={styles.listContainer}>
                <View style={styles.tabNav}>
                    <DisplayButton 
                        buttonStyle={searchType === 'items' ? styles.tabNavButtonSelected : styles.tabNavButton}
                        textStyle={searchType === 'items' ? styles.tabNavTextSelected : styles.tabNavText}
                        onPress={() => setSearchType('items')}
                    >Items</DisplayButton>
                    <DisplayButton
                        buttonStyle={searchType === 'missions' ? styles.tabNavButtonSelected : styles.tabNavButton}
                        textStyle={searchType === 'missions' ? styles.tabNavTextSelected : styles.tabNavText}
                        onPress={() => setSearchType('missions')}
                    >Missions</DisplayButton>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps={"handled"}
                    keyboardDismissMode= {keyboardDismissProp.keyboardDismissMode}
                    onScrollBeginDrag= {keyboardDismissProp.onScrollBeginDrag}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.list}>
                        {!searched?
                            <View style={{width: '100%', height: 210, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{color: '#AEAEAE', marginTop: 20, marginBottom: 10 ,fontSize: 20, textAlign: 'center', fontWeight: '500'}}>Try searching for</Text>
                                {(searchType==='items'? suggestedSearches : suggestedMissions).map((item,i) => {
                                    return(
                                        <View key={`${i}-${item}-suggest`}>
                                            <DisplayButton
                                                buttonStyle={{height: 40, justifyContent: 'center'}}
                                                textStyle={{color: '#8BC178', fontSize: 20}}
                                                onPress={() => {setSearchQuery(item); search(item); console.log('searching...')}}
                                            >
                                                {item}
                                            </DisplayButton>
                                        </View>
                                    )
                                })}
                            </View>
                        :
                        
                            (searching ?  
                                <View style={{justifyContent: 'center', alignItems: 'center', height: 150}}>
                                    <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 30}}>Searching...</Text>
                                </View>
                            :(
                                searched && (searchType==='items'? itemSearch : missionSearch).length === 0 ?
                                    <View style={{justifyContent: 'center', alignItems: 'center', height: 150}}>
                                        <Text style={{fontSize: 20, fontWeight: '500', marginBottom: 30}}>No results for {failedQuery}</Text>
                                        <View style={{alignItems: 'center', justifyContent: 'center' , flexDirection: 'row'}}>
                                            <Text style={{fontSize: 16}}>Check your input or </Text>
                                            <DisplayButton textStyle={styles.inlineNote} buttonStyle={{}} onPress={() => setModalVisible(true)}>
                                                manually add tag
                                            </DisplayButton>
                                            </View>
                                    </View>
                                :
                                (searchType==='items'? itemSearch : missionSearch).map((itemObject, i) => {
                                    let item = itemObject.tag
                                    return(
                                        <View style={styles.listItem} key={`searchitem-${item}${i}`}>
                                            <Text style={styles.listItemText}>
                                                {item}
                                            </Text>
                                            {(searchType==='items'? itemList : missionList).find(element => element === item )?
                                                <IconButton 
                                                    style={styles.deleteButton} 
                                                    iconStyle={styles.checkIcon}
                                                    onPress={() => removeTag(item)}
                                                    icon='check'
                                                />
                                            :
                                                <IconButton 
                                                    style={styles.deleteButton} 
                                                    iconStyle={styles.deleteIcon}
                                                    onPress={() => addTag(item)}
                                                    icon='plus'
                                                />
                                            }
                                        </View>
                                    )
                                })
                            ))
                        }
                    </View>
                    {(searched && !searching && (searchType==='items'? itemSearch : missionSearch).length !== 0) &&
                        <View style={{width: '100%', alignItems: 'center', marginBottom: 40}}>
                            <DisplayButton textStyle={styles.note}  onPress={() => setModalVisible(true)}>
                                Not what you're looking for? Manually add tag...
                            </DisplayButton>
                        </View>
                    }
                    <AddTagsModal 
                        isUser={isUser}
                        modalVisible={modalVisible} 
                        setModalVisible={setModalVisible}
                        itemList={itemList}
                        setItemList={setItemList}
                        missionList={missionList}
                        setMissionList={setMissionList}
                        searchType={searchType}
                    />
                </ScrollView>
            </View>
    );
}

const styles = StyleSheet.create({
    listHeading: {
        fontSize: 20,
        color: '#706052'
    },
    listContainer: {
        marginTop: 25,
        flex: 1
    },
    list: {
        marginLeft: 10,
        paddingBottom: 10,
    },
    listItem: {
        flexDirection: 'row',
        marginTop: 15,
    },
    listItemText: {
        fontSize: 20,
        color: '#706052'
    },
    deleteButton: {
        marginLeft: 'auto',
        height: 30,
        width: 30,
    },
    deleteIcon: {
        fontSize: 18,
        color: '#D77944',
    },
    checkIcon: {
        fontSize: 18,
        color: '#8BC178',
    },
    note: {
        fontSize: 12,
        color: '#8BC178',
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline'
    },
    inlineNote: {
        fontSize: 16,
        color: '#8BC178',
        justifyContent: 'center',
        alignItems: 'center',
        textDecorationLine: 'underline',

    },

    tabNav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tabNavButton: {
        height: 30,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabNavText: {

    },
    tabNavButtonSelected: {
        height: 30,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    tabNavTextSelected: {
        fontWeight: 'bold'
    }
});

export default SearchList;