import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import Home from '../screens/Home';
import Donate from '../screens/Donate';
import Mission from '../screens/Mission';
import Map from '../screens/Map';
import Settings from '../screens/Settings';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
);

const DonateStack = createStackNavigator();

const DonateStackScreen = () => (
    <DonateStack.Navigator>
        <DonateStack.Screen name="Donate" component={Donate} />
        <DonateStack.Screen name="Mission" component={Mission} />
    </DonateStack.Navigator>
);

const DonatePlaceholder = () => (
    <View style={{bakgroundColor: 'blue'}}>
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

export {
    HomeStackScreen,
    DonateStackScreen,
    DonatePlaceholder,
    MapStackScreen,
    SettingsStackScreen
}