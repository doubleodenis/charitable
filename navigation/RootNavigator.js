// https://www.reactnative.express/app/navigation/react_navigation
import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import VendorPage from "../screens/VendorPage"
import TabsNavigator from "./TabsNavigator";
import { SettingsStackScreen, DonateStackScreen, MapStackScreen } from './StackScreens';
import Donate from '../screens/Donate';
import Mission from '../screens/Mission';

//move root navigator stuff here from App.js
const Root = createStackNavigator()

const RootNavigator = () => {
    return (
    <Root.Navigator
        screenOptions={{
            animationEnabled: false,
            headerStyle: {
                backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}
        mode="modal"
    >
        <Root.Screen name="Charitable" component={TabsNavigator} options={{ animationEnabled: true }} />
        <Root.Screen 
            name="Donate" 
            component={Donate} 
            options={{animationEnabled: true}}
        />

        {/* To get to this page, on button press: () => navigation.push("VendorPage", { name: '<vendor name here>' }) */}
        {/* <Root.Screen
            name="Vendor"
            component={VendorPage}
            options={({ route }) => ({
                title: route.params.name,
            })}
        /> */}
    </Root.Navigator>
    )
}

export default RootNavigator;