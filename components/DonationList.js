import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from "react-native"; 
import IconButton from './IconButton'

const DonationList = ({userList, setUserList}) => {
 
    const removeTag = (tag) => {
        let checksCopy = [...userList]
        let index = checksCopy.indexOf(tag)
        if (index > -1) {
            checksCopy.splice(index, 1);
        }
        setUserList(checksCopy)
    }

    return (
        <View style={styles.listContainer}>
            <Text style={styles.listHeading}>
                Your List
            </Text>
            <View style={styles.list}>
                {userList.map((item, i) => (
                    <View style={styles.listItem} key={`listitem-${item}${i}`}>
                        <Text style={styles.listItemText}>
                            {item}
                        </Text>
                        <IconButton 
                            style={styles.deleteButton} 
                            iconStyle={styles.deleteIcon}
                            onPress={() => removeTag(item)}
                            icon='times'
                        />
                    </View>
                ))}
            </View>
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
});
export default DonationList;