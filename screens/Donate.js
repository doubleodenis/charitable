import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Button } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
const Donate = ({navigation}) => {
    return (
        <SafeAreaView>
            <View style={styles.card}>
                <Text>What are you donating?</Text>
            </View>
            
            <Button title="Also search by mission statement" onPress={() => navigation.push('Mission')} />
        </SafeAreaView>
        // <View>
        //     <Text>Donate</Text>
        // </View>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        marginHorizontal: 35,
        borderRadius: 10,
        height: 150,
        backgroundColor: "white",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,  
        elevation: 5
    }
  });

export default Donate;