import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Text, Button } from "react-native";

import Home from "../screens/Home";
import Donate from "../screens/Donate";
import Map from "../screens/Map";
import VendorPageSettings from "../screens/VendorPageSettings";
import VendorPage from "../screens/VendorPage";
import ExitButton from "../components/ExitButton";
import DonateHeader from "../components/DonateHeader";
import DonateFooter from "../components/DonateFooter";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeaderConfirmButton from "../components/HeaderConfirmButton";
import HeaderSettingsButton from "../components/HeaderSettingsButton";
import CancelTextButton from "../components/CancelTextButton";
import OrganizationPage from "../screens/OrganizationPage";
import Settings from "../screens/Settings";

import SecureStorage from "../services/secureStorage";
import TextButton from "../components/TextButton";
import ConfirmButton from "../components/ConfirmButton";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import AuthConsumer, { AuthContext } from "../contexts/AuthContext";
import BackButton from "../components/BackButton";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode="none">
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
                    headerStyle: [
                        styles.searchHeading,
                        {
                            ...Platform.select({
                                ios: {
                                    // height is connected to height in DonateHeader.js
                                    height: 60 + insets.top,
                                },
                                android: {
                                    height: 60,
                                },
                            }),
                        },
                    ],
                    headerLeft: () => <View />,
                    headerRight: () => <ExitButton />,
                    headerTitle: (props) => <DonateHeader {...props} />,
                }}
            >
                <DonateStack.Screen
                    name="Donate"
                    options={{ title: "Search" }}
                    component={Donate}
                />
            </DonateStack.Navigator>
            <DonateFooter />
        </>
    );
};

const DonatePlaceholder = () => (
    <View style={{ backgroundColor: "blue" }}></View>
);

const NotificationsStack = createStackNavigator();

const MapStackScreen = () => (
    <NotificationsStack.Navigator headerMode="none">
        <NotificationsStack.Screen name="Map" component={Map} />
    </NotificationsStack.Navigator>
);

const VendorPageScreen = () => (
    <NotificationsStack.Navigator headerMode="none">
        <NotificationsStack.Screen name="VendorPage" component={VendorPage} />
    </NotificationsStack.Navigator>
);

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
    let context = React.useContext(AuthContext);

    return (
        <SettingsStack.Navigator headerMode="screen">
            <SettingsStack.Screen
                name="Settings"
                listeners={({ navigation }) => ({
                    focus: (e) => {
                        SecureStorage.getValue("token")
                            .then((res) => {
                                //If there is a token, change the header navigation options
                                navigation.setOptions({
                                    headerRight: () => (
                                        <ConfirmButton navigateTo="OrganizationPage">
                                            View Profile
                                        </ConfirmButton>
                                    ),
                                    headerLeft: () => (
                                        <TextButton
                                            style={{
                                                paddingLeft: 15,
                                                paddingVertical: 5,
                                            }}
                                            onPress={() => {
                                                //TODO: Signing out... loading circle
                                                //FUTURE: Modal = Are you sure you want to logout?
                                                context
                                                    .signOut()
                                                    .then((res) => {
                                                        navigation.setOptions({
                                                            headerLeft: null,
                                                            headerRight: () => (
                                                                <ConfirmButton
                                                                    navigateTo={[
                                                                        "Auth",
                                                                        "Sign In",
                                                                    ]}
                                                                >
                                                                    Sign In
                                                                </ConfirmButton>
                                                            ),
                                                        });
                                                    });
                                            }}
                                        >
                                            Logout
                                        </TextButton>
                                    ),
                                });
                            })
                            .catch((err) => {
                                //If no token, change the header navigation options
                                navigation.setOptions({
                                    headerRight: () => (
                                        <ConfirmButton
                                            navigateTo={["Auth", "Sign In"]}
                                        >
                                            Sign In
                                        </ConfirmButton>
                                    ),
                                    headerLeft: null,
                                });
                            });
                    },
                })}
                options={{
                    headerTitle: null,
                }}
            >
                {(props) => (
                    <AuthConsumer>
                        {(ctx) => <Settings context={ctx} {...props} />}
                    </AuthConsumer>
                )}
            </SettingsStack.Screen>
            <SettingsStack.Screen
                name="OrganizationPage"
                component={OrganizationPage}
                options={{
                    headerTitle: null,
                    headerLeft: () => <BackButton />,
                    headerRight: () => <HeaderSettingsButton />,
                }}
            />
            <SettingsStack.Screen
                name="VendorPageSettings"
                component={VendorPageSettings}
                options={({ navigation }) => ({
                    headerTitle: null,
                    headerLeft: () => (
                        <TextButton
                            style={{ paddingLeft: 15, paddingVertical: 5 }}
                            onPress={() => {
                                console.log("back");
                                navigation.goBack();
                            }}
                        >
                            Cancel
                        </TextButton>
                    ),
                    headerRight: () => (
                        <ConfirmButton navigateTo="OrganizationPage">
                            Looks Good
                        </ConfirmButton>
                    ),
                })}
            />
        </SettingsStack.Navigator>
    );
};

const styles = StyleSheet.create({
    searchHeading: {
        backgroundColor: "#FFFBF8",
        shadowColor: "transparent",
        elevation: 0,
    },
});

export {
    HomeStackScreen,
    DonateStackScreen,
    DonatePlaceholder,
    MapStackScreen,
    SettingsStackScreen,
    VendorPageScreen,
};
