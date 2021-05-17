import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native";  
import IconButton from './IconButton'

const AddTagsBar = ({manualTag, setManualTag, userList, setUserList}) => {

    const addTag = (tag) => {
        if(tag !== ''){
            let checksCopy = [...userList]
            checksCopy.push(tag)
            setUserList(checksCopy)
            setManualTag('')
        }
    }

    return (
        <View style={styles.addTagsContainer}>
            <TextInput
                style={styles.input}
                placeholder='Manually add tags'
                onChangeText={(text) => setManualTag(text)}
                value={manualTag}
                returnKeyType='done'
                onSubmitEditing = {()=>addTag(manualTag)}
                blurOnSubmit={false}
            />
            <IconButton 
                style={styles.checkButton} 
                iconStyle={styles.checkIcon}
                onPress={() => addTag(manualTag)}
                icon='check'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    
    input: {
        width: '100%',
        color: '#565656'
    },
    addTagsContainer: {
        height: 35,
        width: '100%',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
    },
    checkButton: {
        marginLeft: 'auto',
        height: 30,
    },
    checkIcon:{
        fontSize: 20,
        color: '#8BC178',
    }
});
export default AddTagsBar;