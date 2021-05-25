import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Modal } from "react-native";  
import DisplayButton from './DisplayButton';
import IconButton from './IconButton'

const AddTagsModal = ({itemList, setItemList, missionList, setMissionList, modalVisible, setModalVisible, searchType}) => {
    const [manualTag, setManualTag] = useState('')
    
    const addTag = (tag) => {
        if(tag && tag.trim()){
            let listCopy = [...itemList]
            listCopy.unshift(tag)
            setItemList(listCopy)
            setManualTag('')
        }
    }

    const addMission = (tag) => {
        if(tag && tag.trim()){
            let listCopy = [...missionList]
            listCopy.unshift(tag)
            setMissionList(listCopy)
            setManualTag('')
        }
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
                        <View style={{width: '100%', alignItems: 'flex-end'}}>
                            <DisplayButton onPress={() => setModalVisible(!modalVisible)}>Cancel</DisplayButton>
                        </View>
                        <View style={styles.addTagsContainer}>
                            {searchType==='items'?
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Manually add an item tag to your search'
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
                            </>
                            :
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Manually add a mission tag to your search'
                                    onChangeText={(text) => setManualTag(text)}
                                    value={manualTag}
                                    returnKeyType='done'
                                    onSubmitEditing = {()=>addMission(manualTag)}
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
                        <Text style={styles.note}>To help your search, your custom tag will need to match with a donation center's custom tag.</Text>
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
        elevation: 5
    },
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
    },
    note: {
        fontSize: 12,
        color: '#706052',
    },
});
export default AddTagsModal;