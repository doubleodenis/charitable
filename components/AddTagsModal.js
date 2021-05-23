import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Modal } from "react-native";  
import DisplayButton from './DisplayButton';
import IconButton from './IconButton'

const AddTagsModal = ({itemList, setItemList, modalVisible, setModalVisible}) => {
    const [manualTag, setManualTag] = useState('')
    
    const addTag = (tag) => {
        
        if(tag){
            console.log(tag)
            let listCopy = [...itemList]
            listCopy.unshift(tag)
            setItemList(listCopy)
            setManualTag('')
        }
    }

    return (
        
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.modalBackground}>
                        <View style={{width: '100%', alignItems: 'flex-end'}}>
                            <DisplayButton onPress={() => setModalVisible(!modalVisible)}>Cancel</DisplayButton>
                        </View>
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
                        <Text style={styles.note}>Keep in mind that, to help your search, your custom tag will need to match with a donation center's custom tag.</Text>
                    </View>
                </View>
            </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        width: '80%',
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