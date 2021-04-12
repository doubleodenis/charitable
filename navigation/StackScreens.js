import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../screens/Home';
import Donate from '../screens/Donate';
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
    </DonateStack.Navigator>
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
    MapStackScreen,
    SettingsStackScreen
}