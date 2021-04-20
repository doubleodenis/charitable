// https://www.reactnative.express/app/navigation/react_navigation
import React from "react";
import { createStackNavigator } from '@react-navigation/stack'
import VendorPage from "../screens/VendorPage"
import TabsNavigator from "./TabsNavigator";
//move root navigator stuff here from App.js
const Root = createStackNavigator()

const RootNavigator = () => {
    return (
    <Root.Navigator
        // screenOptions={{
        //     headerStyle: {
        //         backgroundColor: "#f4511e",
        //     },
        //     headerTintColor: "#fff",
        //     headerTitleStyle: {
        //         fontWeight: "bold",
        //     },
        // }}
    >
        {/* To get to this page, on button press: () => navigation.push("VendorPage", { name: '<vendor name here>' }) */}
        {/* <Root.Screen
            name="Vendor"
            component={VendorPage}
            options={({ route }) => ({
                title: route.params.name,
            })}
        /> */}

        <Root.Screen name="Charitable" component={TabsNavigator} options={{ animationEnabled: true }} />
        
    </Root.Navigator>
    )
}

export default RootNavigator;