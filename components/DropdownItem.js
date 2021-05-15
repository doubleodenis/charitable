import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native";  
import BouncyCheckbox from "react-native-bouncy-checkbox";


const DropdownItem = ({item}) => {
    const [checked, setChecks] = useState({})
    const [otherText, setText] = useState("");
    const [otherNumbers, setNumbers] = useState("1. ");
    const [boxHeight, setBoxHeight] = useState(null)

    const measureView = (e) => {
        setBoxHeight(e.nativeEvent.contentSize.height)
    }

    useEffect(() => {
        return () => { // componentWillUnmount
            parseText()
        }
    }, [])

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

    const updateItems = (item) => {
        let checksCopy = checked; // possibly needs to be a deep copy
        if(checksCopy){
            setChecks(false);
        }
        else{
            setChecks(true);
        }
    }

    const addText = (text) => {
        setText(text)
    }

    const parseText = () => {
        let splitInput = otherText.split('\n')
        splitInput.map((item) => updateItems(item))
    }

    return (
        <View>
                <View>
                    <BouncyCheckbox 
                        text={item}
                        fillColor='#8BC178' 
                        style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 10}}
                        iconStyle={{ borderRadius: 5, borderColor: '#8BC178'}} 
                        textStyle={{textDecorationLine: "none"}}
                        isChecked={checked}
                        disableBuiltInState
                        onPress={(isChecked: boolean = false) => { 
                            updateItems('Other')
                        }}
                    />
                    {checked ?
                        
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
                </View>
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
    inputContainer: {
        height: 'auto',
        width: '95%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
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
    }
});
export default DropdownItem;