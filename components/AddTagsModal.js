import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Modal, KeyboardAvoidingView } from "react-native";  
import DisplayButton from './DisplayButton';
import IconButton from './IconButton'

const AddTagsModal = ({itemList, setItemList, missionList, setMissionList, modalVisible, setModalVisible, searchType}) => {
    const [manualTag, setManualTag] = useState('')
    const [added, setAdded] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [addedTag, setAddedTag] = useState('Tag')
    
    const addTag = (tag) => {
        if(tag && tag.trim()){
            let listCopy = [...itemList]
            listCopy.unshift(tag)
            setItemList(listCopy)
            setManualTag('')
            setAddedTag(tag)
            setInvalid(false)
            setAdded(true)
        }
        else{
            setAdded(false)
            setInvalid(true)
        }
    }

    const addMission = (tag) => {
        if(tag && tag.trim()){
            let listCopy = [...missionList]
            listCopy.unshift(tag)
            setMissionList(listCopy)
            setManualTag('')
            setAddedTag(tag)
            setInvalid(false)
            setAdded(true)
        }
        else{
            setAdded(false)
            setInvalid(true)
        }
    }

    const closeModal = () => {
        setModalVisible(!modalVisible)
        setAdded(false)
        setInvalid(false)
    }

    return (
        
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (modalVisible?'rgba(0, 0, 0, 0.6)': 'none')}}>
                    <View style={styles.modalBackground}>
                        <View style={{width: '100%', alignItems: 'flex-start'}}>
                            <Text style={{fontSize: 18, fontWeight: '500'}}>{searchType==='items'? 'Add Item Tag' : 'Add Mission Tag'}</Text>
                        </View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24}}>
                            <View style={styles.addTagsContainer}>
                                {searchType==='items'?
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Manually add an item tag'
                                        onChangeText={(text) => setManualTag(text)}
                                        value={manualTag}
                                        returnKeyType='done'
                                        onSubmitEditing = {()=>addTag(manualTag)}
                                        autoFocus={true}
                                        blurOnSubmit={false}
                                    />
                                    <IconButton 
                                        style={styles.checkButton} 
                                        iconStyle={styles.checkIcon}
                                        onPress={() => addTag(manualTag)}
                                        icon='check'
                                    />
                                </>
                                :
                                <>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Manually add a mission tag'
                                        onChangeText={(text) => setManualTag(text)}
                                        value={manualTag}
                                        returnKeyType='done'
                                        onSubmitEditing = {()=>addMission(manualTag)}
                                        autoFocus={true}
                                        blurOnSubmit={false}
                                    />
                                    <IconButton 
                                        style={styles.checkButton} 
                                        iconStyle={styles.checkIcon}
                                        onPress={() => addMission(manualTag)}
                                        icon='check'
                                    />
                                </>
                                }
                            </View>
                            <DisplayButton onPress={() => closeModal()}>Close</DisplayButton>
                        </View>
                        <View style={{width: '100%', justifyContent: 'flex-start', marginTop: 3, height: 14}}>
                            {added?
                                <Text style={styles.addedNote}>"{addedTag}" has been added to search tags!</Text>
                            :
                                (invalid?
                                    <Text style={[styles.addedNote, {color: '#D77944'}]}>Invalid tag, please check your input</Text>
                                :
                                    null
                                )
                            }
                            
                        </View>
                        <View style={{width: '100%', alignItems: 'flex-start'}}>
                            <Text style={styles.note}>To help your search, your custom tag will need to match with a donation center's custom tag.</Text>
                        </View>
                        
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 165
    },
    input: {
        width: '100%',
        color: '#565656'
    },
    addTagsContainer: {
        height: 35,
        width: '85%',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkButton: {
        marginLeft: 'auto',
        height: 30,
    },
    checkIcon:{
        fontSize: 20,
        color: '#8BC178',
    },
    note: {
        fontSize: 12,
        color: '#706052',
        marginTop: 10,
    },
    addedNote: {
        fontSize: 12,
        color: '#8BC178',
        
    },
});
export default AddTagsModal;