import { NavigationHelpersContext } from "@react-navigation/core";
import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Button } from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
const Mission = ({navigation}) => {
    return (
        <SafeAreaView>
            <Text>Mission</Text>
            <Button title="Edit items list" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}

export default Mission;