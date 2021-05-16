import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native";  
import IconButton from './IconButton'

const ChecklistCard = ({text, items}) => {
    const [checks, setChecks] = useState(items)
    const [otherText, setText] = useState("");

    useEffect(() => {
        console.log(checks)
    }, [checks])

    const removeTag = (tag) => {
        let checksCopy = [...checks]
        let index = checksCopy.indexOf(tag)
        if (index > -1) {
            checksCopy.splice(index, 1);
        }
        setChecks(checksCopy)
    }

    const addTag = (tag) => {
        if(tag !== ''){
            let checksCopy = [...checks]
            checksCopy.push(tag)
            setChecks(checksCopy)
            setText('')
        }
    }

    return (
        <View style={styles.card}>
                <Text style={styles.cardText}>{text}</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Search for items'
                    />
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.listHeading}>
                        Your List
                    </Text>
                    <View style={styles.list}>
                        {checks.map((item, i) => (
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
                <Text style={styles.note}>Can’t find a tag that describes your items? Use the input below to add items manually</Text>
                <View style={styles.addTagsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Manually add tags'
                        onChangeText={(text) => setText(text)}
                        value={otherText}
                        returnKeyType='done'
                        onSubmitEditing = {()=>addTag(otherText)}
                        blurOnSubmit={false}
                    />
                    <IconButton 
                        style={styles.checkButton} 
                        iconStyle={styles.checkIcon}
                        onPress={() => addTag(otherText)}
                        icon='check'
                        
                    />
                </View>
                <Text style={styles.note}>Press Return to add items to the list</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
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
    input: {
        width: '100%',
        color: '#565656'
    },
    note: {
        fontSize: 12,
        color: '#706052',
    },
    searchContainer: {
        width: '100%',
        padding: 5,
        height: 35,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 25
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
    checkButton: {
        marginLeft: 'auto',
        height: 30,
    },
    checkIcon:{
        fontSize: 20,
        color: '#8BC178',
    }
});
export default ChecklistCard;