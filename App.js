import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import Loading from "./screens/Loading";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from './contexts/AuthContext';

// https://reactnavigation.org/docs/headers#adjusting-header-styles


export default App = () => {
    const [isLoading, setLoading] = useState(true);
    const [userToken, setUserToken] = useState("test");

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <Loading />;
        // return <Splash /> splash screen is loading screen
    }
    return (
        <>
            <StatusBar  barStyle="light-content" translucent={true} />
            <AuthProvider>
                <SafeAreaProvider>
                    <NavigationContainer>       
                        <RootNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </AuthProvider>
        </>
    );
};
