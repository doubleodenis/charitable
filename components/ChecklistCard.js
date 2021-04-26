import React, {useState, useEffect, useRef} from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native";  
import BouncyCheckbox from "react-native-bouncy-checkbox";


const ChecklistCard = ({text, items}) => {
    const [checks, setChecks] = useState({})
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

    // useEffect(() => {
    //     console.log(checks)
    // }, [checks])

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
        let checksCopy = {...checks}; // possibly needs to be a deep copy
        if(checksCopy[`${item}`]){
            delete checksCopy[`${item}`];
        }
        else{
            checksCopy[`${item}`] = true;
        }
        setChecks(checksCopy)
    }

    const addText = (text) => {
        setText(text)
    }

    const parseText = () => {
        let splitInput = otherText.split('\n')
        splitInput.map((item) => updateItems(item))
    }

    return (
        <View style={styles.card}>
                <Text style={styles.cardText}>{text}</Text>
                <View>
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
    }
});
export default ChecklistCard;