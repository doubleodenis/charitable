import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Button } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
const Mission = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Donate</Text>
            <Button title="Go back" onPress={() => alert('Ok')} />
        </SafeAreaView>
    )
}

export default Mission;