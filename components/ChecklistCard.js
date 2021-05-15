import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native";  
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DisplayButton from './DisplayButton'
import IconButton from './IconButton'


const ChecklistCard = ({text, items}) => {
    const [checks, setChecks] = useState(items)
    const [otherText, setText] = useState("");
    const [otherNumbers, setNumbers] = useState("1. ");
    const [boxHeight, setBoxHeight] = useState(null)

    const measureView = (e) => {
        setBoxHeight(e.nativeEvent.contentSize.height)
    }

    useEffect(() => {
        // return () => { // componentWillUnmount
        //     parseText()
        // }
    }, [])

    useEffect(() => {
        console.log(checks)
    }, [checks])

    useEffect(() => {
        if(boxHeight){
            let i
            let tempString = '1. '
            for(i=2 ; i < (boxHeight/16) ; ++i){
                (i === 1 ? tempString += i +'. ' : tempString += '\n' + i +'. ')
            }
            setNumbers(tempString)
        }
    }, [boxHeight])

    // const updateItems = (item) => {
    //     let checksCopy = {...checks}; // possibly needs to be a deep copy
    //     if(checksCopy[`${item}`]){
    //         delete checksCopy[`${item}`];
    //     }
    //     else{
    //         checksCopy[`${item}`] = true;
    //     }
    //     setChecks(checksCopy)
    // }

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

    // const parseText = () => {
    //     let splitInput = otherText.split('\n')
    //     splitInput.map((item) => updateItems(item))
    // }

    return (
        <View style={styles.card}>
                <Text style={styles.cardText}>{text}</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Search for items'
                        onPressOut={()=>{console.log('gorgo'); this.blur()}}
                    />
                </View>
                <View style={styles.listContainer}>
                    <Text style={styles.listHeading}>
                        Your List
                    </Text>
                    <View style={styles.list}>
                        {checks.map((item, i) => (
                            <View style={styles.listItem} key={`listitem-${item}${i}`}>
                                <Text>
                                    {item}
                                </Text>
                                <IconButton 
                                    buttonStyle={styles.delete} 
                                    onPress={() => removeTag(item)}
                                    icon='times'
                                    iconStyle={{color: '#D77944'}}
                                />
                            </View>
                        ))}
                    </View>
                </View>
                <Text style={styles.note}>Can’t find a tag that describes your items? Use the input below to add items manually</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Manually add tags'
                        onPressOut={()=>{console.log('blurring'); this.blur()}}
                        onChangeText={(text) => setText(text)}
                        value={otherText}
                        returnKeyType='done'
                        onSubmitEditing = {()=>addTag(otherText)}
                        blurOnSubmit={false}
                    />
                    <IconButton 
                        buttonStyle={styles.delete} 
                        onPress={() => addTag(otherText)}
                        icon='check'
                        iconStyle={{color: '#8BC178', fontSize: 16}}
                    />
                </View>
                <Text style={styles.note}>Press Return to add items to the list</Text>
                {/* <View>
                    {items.map((item, i) => (
                        <BouncyCheckbox 
                            key={`checkbox-${item}${i}`}
                            text={item} 
                            fillColor='#8BC178' 
                            style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                            iconStyle={{ borderRadius: 5, borderColor: '#8BC178'}} 
                            textStyle={{textDecorationLine: "none"}}
                            isChecked={checks[`${item}`]}
                            disableBuiltInState
                            onPress={(isChecked: boolean = false) => {
                                updateItems(item)
                            }}
                        /> 
                    ))}
                    <BouncyCheckbox 
                        text='Other'
                        fillColor='#8BC178' 
                        style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                        iconStyle={{ borderRadius: 5, borderColor: '#8BC178'}} 
                        textStyle={{textDecorationLine: "none"}}
                        isChecked={checks['Other']}
                        disableBuiltInState
                        onPress={(isChecked: boolean = false) => { 
                            updateItems('Other')
                        }}
                    />
                    {checks['Other'] ?
                        
                        <View>
                            <View style={styles.textBoxContainer}>
                                <TextInput
                                    multiline
                                    numberOfLines={1}
                                    style={styles.numbering}
                                    value={otherNumbers}
                                    editable = {false}
                                />
                                <TextInput
                                    onContentSizeChange={(event) => measureView(event)}
                                    multiline
                                    numberOfLines={1}
                                    style={styles.input}
                                    onChangeText={(text) => addText(text)}
                                    value={otherText}
                                    onPressOut={()=>{console.log('gorgo'); this.blur()}}
                                />
                            </View>
                            <Text style={styles.note}>Press Return to add items to the list</Text>
                        </View>
                    :
                        null
                    }
                </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
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
    },
    textBoxContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        marginTop: 5
    },
    numbering: {
        width: '5%',
        color: '#565656'
    },
    input: {
        width: '100%',
        color: '#565656'
    },
    note: {
        fontSize: 12,
        color: '#706052',
        marginTop: 3,
        marginLeft: 7,
    },
    searchContainer: {
        width: '100%',
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        marginTop: 5,
        flexDirection: 'row'
    },
    listHeading: {
        fontSize: 16,

    },
    listContainer: {
        marginTop: 20
    },
    list: {
        marginLeft: 10
    },
    listItem: {
        flexDirection: 'row'
    },
    delete: {
        marginLeft: 'auto'
    }
});
export default ChecklistCard;