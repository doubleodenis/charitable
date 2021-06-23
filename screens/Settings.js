/*
    This page will display the main charity page that a user has selected
    Think of it as a charity profile page
    This is where the products that they desire are listed. Their mission statement and what they do, 
    along with possibly photos. 
*/

/*  
    This where most users will start, and select an item that they are looking to donate. It will then do a search of charities
    accepting donations for that kind of item. (maybe use craigslist list for categories or make your own).

    This is also the screen where if you haven't searched up any donations you can set up a charity account. (have some way to become a verified account (location would help))

    Search through (or search bar) a list of categories and select one. This will then generate the list of charities.
*/

import React, { useState, useEffect } from "react";

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    FlatList,
    Button,
    Image,
} from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SecureStorage from "../services/secureStorage";
import DisplayButton from "../components/DisplayButton";
import ConfirmButton from "../components/ConfirmButton";

import root from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";

const Settings = ({ context }) => {
    const [organization, setOrganization] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    let navigation = useNavigation();
   
    // useFocusEffect(
    //     React.useCallback(() => {
    //         SecureStorage.getValue("token")
    //         .then((res) => { 
    //             //Apparently I can't set this in an unmounted component (dont know how to fix)
    //             setLoggedIn(true);
    //         }).catch(err => {
    //             setLoggedIn(false);
    //         })
    //     }, [loggedIn])
    // )
    
    //Listens to changes to the auth context 
    useEffect(() => {
        if(context.state.userToken) {
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
    }, [context])

    return (
        <View style={styles.container}>
            {/* Brand logo here */}

            {loggedIn && (
                <View>
                    <View><Text>Avatar</Text></View>
                    <View style={{ width: "80%" }}>
                        <View style={styles.orgHeader}><Text>West Charity</Text></View>
                        <View><Text>Description</Text></View>
                    </View>
                </View>
            )}

            <View>
                <SettingsButton useIcon>General</SettingsButton>

                <SettingsButton useIcon>Notifications</SettingsButton>

                <SettingsButton useIcon>Help</SettingsButton>

                <SettingsButton>Tell a Friend</SettingsButton>

                <SettingsButton>Rate us on the App Store</SettingsButton>
            </View>

            {
                !loggedIn ? (
                    <View
                    style={{
                        marginTop: 25,
                        borderTopWidth: 1,
                        borderTopColor: "lightgray",
                        paddingVertical: 25,
                    }}
                    >
                        <RegisterSection navigation={navigation} />
                    </View>
                ) : null
            }
           
        </View>
    );
};

const SettingsButton = ({ useIcon = false, navigateTo, children }) => {
    return (
        <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.boldStandardText}>{children}</Text>
            {useIcon && (
                <Icon name="chevron-right" style={root.textPrimaryColor} />
            )}
        </TouchableOpacity>
    );
};

const RegisterSection = ({ navigation }) => {
    
    function goToSignUp() {
        navigation.navigate('Auth', { screen: 'Sign Up' });
    }
    return (
        <View style={styles.registerSection}>
            <View style={styles.registerTextSection}>
                <Text style={{ ...styles.boldText, textAlign: "center" }}>
                    Are you an organization that would like to register with
                    charitable?
                </Text>
                <Text style={{ ...styles.description, textAlign: "center" }}>
                    Setting up your organization information allows people in
                    your area to see the donation items you need!
                </Text>
            </View>
            <DisplayButton
                buttonStyle={root.barButton}
                textStyle={root.barButtonText}
                onPress={goToSignUp}
            >
                Click here to get started
            </DisplayButton>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        width: "100%",
        // margin: 'auto',
        padding: 24,
        backgroundColor: "white",
        // borderRadius: 15,
        //Box shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    registerSection: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 225,
    },
    registerTextSection: {
        paddingHorizontal: 16,
        display: "flex",
        justifyContent: "space-between",
        height: 150,
    },
    orgHeader: {
        fontSize: 32,
        textAlign: "center",
        color: "#8BC178",
        marginBottom: 10,
    },
    settingsButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 45,
        width: "100%",
    },
    boldStandardText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#706052",
    },
    boldText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#706052",
    },
    section: {
        textAlign: "left",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
    },
    imageContainer: {
        width: "100%",
        marginVertical: 10,
        //   height: 150,
    },
    orgImage: {
        resizeMode: "cover",
    },

    sectionHeader: {
        fontSize: 18,
        marginBottom: 5,
    },
    textButton: {
        color: "#8BC178",
        fontSize: 14,
    },
    description: {
        fontSize: 16,
        color: "#706052",
        lineHeight: 20,
    },
});

export default Settings;
