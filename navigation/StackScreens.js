import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Text, Button } from "react-native";

import Home from '../screens/Home';
import Donate from '../screens/Donate';
import Mission from '../screens/Mission';
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
import SecureStorage from '../services/secureStorage';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
);

const DonateStack = createStackNavigator();

const DonateStackScreen = () => (
    <>
        <DonateStack.Navigator 
            screenOptions={{
                headerStyle: styles.searchHeading,
                headerTitleStyle: styles.searchHeadingTitle,
                headerLeft: null,
                headerRight: (() => <ExitButton/>),
                headerTitle: props => <DonateHeader {...props} />
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
        <DonateFooter/>
    </>
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
    <SettingsStack.Navigator headerMode='screen'>
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
        height: 70,
    },
});

export {
    HomeStackScreen,
    DonateStackScreen,
    DonatePlaceholder,
    MapStackScreen,
    SettingsStackScreen
}