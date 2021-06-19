import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Text, Button } from "react-native";

import Home from '../screens/Home';
import Donate from '../screens/Donate';
import Map from '../screens/Map';
import VendorPageSettings from '../screens/VendorPageSettings';
import VendorPage from '../screens/VendorPage';
import ExitButton from '../components/ExitButton'
import DonateHeader from '../components/DonateHeader'
import DonateFooter from '../components/DonateFooter'
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderConfirmButton from '../components/HeaderConfirmButton';
import HeaderSettingsButton from '../components/HeaderSettingsButton';
import CancelTextButton from '../components/CancelTextButton';
import OrganizationPage from '../screens/OrganizationPage';
import Settings from '../screens/Settings';

import SecureStorage from '../services/secureStorage';
import TextButton from '../components/TextButton';
import ConfirmButton from '../components/ConfirmButton';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

var loggedIn = false;
SecureStorage.getValue('token').then(res => {
    loggedIn = true;
})
.catch(err => {
    loggedIn = false;
});

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
);

const DonateStack = createStackNavigator();

const DonateStackScreen = () => {
    const insets = useSafeAreaInsets();
    return (
        <>
            <DonateStack.Navigator 
                screenOptions={{
                    headerStyle: [styles.searchHeading, {...Platform.select({
                        ios: {
                            // height is connected to height in DonateHeader.js
                            height: 60 + insets.top,
                        },
                        android: {
                            height: 60,
                        },
                    })}],
                    headerLeft: (() => <View/>),
                    headerRight: (() => <ExitButton/>),
                    headerTitle: props => <DonateHeader {...props} />
                }}
            >
                <DonateStack.Screen 
                    name="Donate" 
                    options={{title: 'Search'}} 
                    component={Donate}
                />
            </DonateStack.Navigator>
            <DonateFooter/>
        </>
    );
}

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
    <SettingsStack.Navigator headerMode='screen'>
        <SettingsStack.Screen name="Settings" component={Settings} 
            options={{
                headerTitle: null,
                headerLeft: () => (
                    <TextButton style={{ paddingLeft: 15, paddingVertical: 5 }} onPress={() => {
                        SecureStorage.storeValue('token', '').then(res => {
                            //navigate refresh
                            console.log('token has been removed')
                        })
                    }}>
                        <Text style={{ fontSize: 18, color: "#9B9B9B" }}>Logout</Text> 
                    </TextButton>
                ),
                headerRight: loggedIn ? () => <ConfirmButton navigateTo="Sign In">Sign In</ConfirmButton> : () => <ConfirmButton navigateTo="OrganizationPage">View Profile</ConfirmButton>
            }}
        />
        <SettingsStack.Screen name="OrganizationPage" component={OrganizationPage} 
            options={{
                headerTitle: null,
                headerLeft: () => (
                    <TouchableOpacity style={{ paddingLeft: 15, paddingVertical: 5 }} onPress={() => {
                        SecureStorage.storeValue('token', '').then(res => {
                            //navigate refresh
                            console.log('token has been removed')
                        })
                    }}>
                        <Text style={{ fontSize: 18, color: "#9B9B9B" }}>Logout</Text> 
                    </TouchableOpacity>
                ),
                headerRight: () => <HeaderSettingsButton />
                }}
                />
        <SettingsStack.Screen name="VendorPageSettings" component={VendorPageSettings} 
            options={{
                headerTitle: null,
                headerLeft: () => <CancelTextButton />,
                headerRight: () => <HeaderConfirmButton /> 
                }}/>
    </SettingsStack.Navigator>
);

const styles = StyleSheet.create({
    searchHeading: {
        backgroundColor: '#FFFBF8',
        shadowColor: 'transparent',
        elevation: 0,
    },
});

export {
    HomeStackScreen,
    DonateStackScreen,
    DonatePlaceholder,
    MapStackScreen,
    SettingsStackScreen
}