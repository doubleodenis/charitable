import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from "react-native"; 
import IconButton from './IconButton'
import DisplayButton from './DisplayButton'
import AddTagsModal from './AddTagsModal';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const dummyList=['Clothes', 'Furniture', 'Electronics', 'Sanitary Products', 'Toys', 'Jeans', 'Toothbrushes', 'Garage Mats', 'Computer', 'Flowers']
const dummyMissions=['Shelters', 'Needy', 'Underprivileged']
const suggestedSearches=['Clothes', 'Furniture', 'Toys']
const suggestedMissions=['Homeless Shelters', 'Orphanages', 'Wellness']

const SearchList = ({itemList, setItemList, missionList, setMissionList, searchQuery, setSearchQuery}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [searchType, setSearchType] = useState('items')
    const [itemSearch, setItemSearch] = useState([])
    const [missionSearch, setMissionSearch] = useState([])
    const [emptySearch, setEmptySearch] = useState(true)

    useEffect(() => {
        let searchCopy = searchQuery + ''
        if(searchCopy.trim().length > 0)
        {
            if(searchType==='items') {
                setItemSearch(dummyList.filter(s => s.toLocaleUpperCase().includes(searchQuery.toLocaleUpperCase())))
            }
            else
                setMissionSearch(dummyMissions.filter(s => s.toLocaleUpperCase().includes(searchQuery.toLocaleUpperCase())))
        }
    }, [searchQuery]);

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
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps={"handled"}
                >
                <View style={styles.list}>
                {(searchQuery+'').trim().length === 0 ?
                    <View style={{width: '100%', height: 210, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#AEAEAE', marginTop: 20, marginBottom: 10 ,fontSize: 20, textAlign: 'center', fontWeight: '500'}}>Try searching for</Text>
                        {(searchType==='items'? suggestedSearches : suggestedMissions).map((item,i) => {
                            return(
                                <View key={`${i}-${item}-suggest`}>
                                    <DisplayButton
                                        buttonStyle={{height: 40, justifyContent: 'center'}}
                                        textStyle={{color: '#8BC178', fontSize: 20}}
                                        onPress={() => setSearchQuery(item)}
                                    >
                                        {item}
                                    </DisplayButton>
                                </View>
                            )
                        })}
                    </View>
                :
                    (
                        (searchType==='items'? itemSearch : missionSearch).length === 0 ?
                            <View style={{justifyContent: 'center', alignItems: 'center', height: 90}}>
                                <Text style={{fontSize: 16}}>No results :(</Text>
                            </View>
                            
                        :
                        (searchType==='items'? itemSearch : missionSearch).map((item, i) => (
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
                        ))
                    )
                }
                </View>
                {(searchQuery+'').trim().length > 0 &&
                    <View style={{width: '100%', alignItems: 'center', marginBottom: 40}}>
                        <DisplayButton textStyle={styles.note}  onPress={() => setModalVisible(true)}>
                            Not what you're looking for? Manually add tag...
                        </DisplayButton>
                    </View>
                }
                
                <AddTagsModal 
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