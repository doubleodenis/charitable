import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from "react-native"; 
import IconButton from './IconButton'

const DonationList = ({itemList, missionList, setItemList, setMissionList}) => {
    const removeItem = (tag) => {
        let checksCopy = [...itemList]
        let index = checksCopy.indexOf(tag)
        if (index > -1) {
            checksCopy.splice(index, 1);
        }
        setItemList(checksCopy)
    }

    const removeMission = (tag) => {
        let checksCopy = [...missionList]
        let index = checksCopy.indexOf(tag)
        if (index > -1) {
            checksCopy.splice(index, 1);
        }
        setMissionList(checksCopy)
    }

    return (
        <View style={styles.listContainer}>
            {itemList.length > 0 &&
            <>
                <Text style={styles.listHeading}>
                    I am donating:
                </Text>
                <View style={styles.list}>
                    {itemList.map((item, i) => (
                        <View style={styles.listItem} key={`listitem-${item}${i}`}>
                            <Text style={styles.listItemText}>
                                {item}
                            </Text>
                            <IconButton 
                                style={styles.deleteButton} 
                                iconStyle={styles.deleteIcon}
                                onPress={() => removeItem(item)}
                                icon='times'
                            />
                        </View>
                    ))}
                </View>
            </>
            }
            {missionList.length > 0 &&
            <>
                <Text style={styles.listHeading}>
                    {itemList.length > 0 ? 'to:' : 'I am donating to:'}
                </Text>
                <View style={styles.list}>
                    {missionList.map((item, i) => (
                        <View style={styles.listItem} key={`listitem-${item}${i}`}>
                            <Text style={styles.listItemText}>
                                {item}
                            </Text>
                            <IconButton 
                                style={styles.deleteButton} 
                                iconStyle={styles.deleteIcon}
                                onPress={() => removeMission(item)}
                                icon='times'
                            />
                        </View>
                    ))}
                </View>
            </>
            }
            {(!(missionList.length > 0) && (!itemList.length > 0)) && 
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.emptyList}>Adding tags to your search will allow Charitable to find nearby locations that accept your donations :)</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    listHeading: {
        fontSize: 20,
        color: '#706052'
    },
    listContainer: {
        marginTop: 25
    },
    list: {
        marginLeft: 10,
        marginBottom: 25
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
    emptyList: {
        marginBottom: 30,
        fontSize: 16,
        color: '#706052'
    }
});
export default DonationList;