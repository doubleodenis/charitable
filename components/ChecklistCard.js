import React, {useState} from 'react'
import { View, Text, StyleSheet  } from "react-native";  
import BouncyCheckbox from "react-native-bouncy-checkbox";

const ChecklistCard = ({text, items}) => {
    const [check, setCheck] = useState(false)

    return (
        <View style={styles.card}>
                <Text style={styles.cardText}>{text}</Text>
                <View>
                    {items.map((item, i) => (
                        <View key={`checkbox-${i}`} style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                            <BouncyCheckbox text={item} fillColor='#8BC178' iconStyle={{ borderRadius: 5, borderColor: '#8BC178'}} textStyle={{textDecorationLine: "none"}}/> 
                        </View>
                    ))}
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
});
export default ChecklistCard;