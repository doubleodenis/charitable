import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from "react-native"; 
import IconButton from './IconButton'
import DisplayButton from './DisplayButton'
import AddTagsModal from './AddTagsModal';
import { ScrollView } from 'react-native-gesture-handler';

const dummyList=['Clothes', 'Furniture', 'Electronics', 'Sanitary Products', 'Toys', 'Jeans', 'Toothbrushes', 'Garage Mats', 'Computer', 'Flowers']

const SearchList = ({itemList, setItemList}) => {
    const [modalVisible, setModalVisible] = useState(false)

    const addTag = (tag) => {
        let listCopy = [...itemList]
        listCopy.unshift(tag)
        setItemList(listCopy)
    }

    const removeItem = (tag) => {
        let checksCopy = [...itemList]
        let index = checksCopy.indexOf(tag)
        if (index > -1) {
            checksCopy.splice(index, 1);
        }
        setItemList(checksCopy)
    }

    return (
        
            <View style={styles.listContainer}>
                <ScrollView
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps={"handled"}
                >
                <View style={styles.list}>
                    {dummyList.map((item, i) => (
                        <View style={styles.listItem} key={`listitem-${item}${i}`}>
                            <Text style={styles.listItemText}>
                                {item}
                            </Text>
                            {itemList.find(element => element === item )?
                                <IconButton 
                                    style={styles.deleteButton} 
                                    iconStyle={styles.checkIcon}
                                    onPress={() => removeItem(item)}
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
                    ))}
                </View>
                <View style={{width: '100%', alignItems: 'center', marginBottom: 40}}>
                    <DisplayButton textStyle={styles.note}  onPress={() => setModalVisible(true)}>
                        Not what you're looking for? Manually add tag...
                    </DisplayButton>
                </View>
                <AddTagsModal 
                    modalVisible={modalVisible} 
                    setModalVisible={setModalVisible}
                    itemList={itemList}
                    setItemList={setItemList}
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
        paddingBottom: 25,
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
});

export default SearchList;