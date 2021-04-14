import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Text } from "react-native";

import Home from '../screens/Home';
import Donate from '../screens/Donate';
import Mission from '../screens/Mission';
import Map from '../screens/Map';
import Settings from '../screens/Settings';
import ExitButton from '../components/ExitButton'

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
);

const DonateStack = createStackNavigator();

const DonateStackScreen = () => (
    <DonateStack.Navigator 
        screenOptions={{
            headerStyle: styles.searchHeading,
            headerTitleStyle: styles.searchHeadingTitle,
            headerLeft: null,
            headerRight: (() => <ExitButton/>)
        }}
    >
        <DonateStack.Screen 
            name="Donate" 
            options={{title: 'Search'}} 
            component={Donate}
        />
        <DonateStack.Screen 
            name="Mission" 
            options={{title: 'Search'}} 
            component={Mission}
        />
    </DonateStack.Navigator>
);

const DonatePlaceholder = () => (
    <View style={{backgroundColor: 'blue'}}>
    </View>
);

const NotificationsStack = createStackNavigator();

const MapStackScreen = () => (
    <NotificationsStack.Navigator headerMode='none'>
        <NotificationsStack.Screen name="Map" component={Map} />
    </NotificationsStack.Navigator>
);

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => (
    <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
);

const styles = StyleSheet.create({
    searchHeading: {
        backgroundColor: '#FFFBF8',
        shadowColor: 'transparent',
        height: 70
    },
    searchHeadingTitle: {
        color: '#9B9B9B',
        fontSize: 24,
    }
});

export {
    HomeStackScreen,
    DonateStackScreen,
    DonatePlaceholder,
    MapStackScreen,
    SettingsStackScreen
}