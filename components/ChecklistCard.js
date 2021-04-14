import React from 'react'
import { View, Text, StyleSheet  } from "react-native";  

const ChecklistCard = ({text, items}) => {
    return (
        <View style={styles.card}>
                <Text style={styles.cardText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 10,
        height: 150,
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