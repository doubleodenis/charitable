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
    Image,
    Switch
} from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import SecureStorage from "../services/secureStorage";
import DisplayButton from "../components/DisplayButton";
import ConfirmButton from "../components/ConfirmButton";
import TextButton from "../components/TextButton";
import root from "../styles";
import Icon from "react-native-vector-icons/FontAwesome";
import logo from "../assets/Charitable_Logo.png"
import OrganizationApi from "../services/organization";
import Accordion from "../components/Accordion";

import { showMessage, hideMessage } from "react-native-flash-message";
import { AuthContext } from "../contexts/AuthContext";

const Settings = ({ context }) => {
    const [organization, setOrganization] = useState(null);
    const [loggedIn, setLoggedIn] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    
    //Toggles
    const [darkMode, setDarkMode] = useState(false);
    const [pushNotifs, setPushNotifs] = useState(false);
    
    const toggleSwitch = (setter) => setter(previousState => !previousState);

    let navigation = useNavigation();

    function changeHeaderAction() {
        console.log('changing header button');
        navigation.setOptions({
            headerRight: () => (
                <ConfirmButton navigateTo="VendorPageSettings">
                    Setup Profile
                </ConfirmButton>
            )
        });
    }

    function getOrganization() {
        OrganizationApi.getCurrentOrganization(context.state.userToken).then(res => {
            console.log('org', res);
            if(res) 
                setOrganization(res)
            else {
                changeHeaderAction();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        context.checkAuth().then(res => {
            console.log('checking', res)
            _checkLoginState();

            getOrganization();
        })
        .catch(err => {
            _checkLoginState();
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            console.log('focusing')
            context.checkAuth().then(res => {
                
                _checkLoginState();

                getOrganization();
            })
            .catch(err => {
                // navigation.refresh(true);
            })
          return undefined;
        }, [])
      );

    function _checkLoginState() {
        if(context?.state.userToken && !loggedIn) {
            setLoggedIn(true);
        }
        else if(!context?.state.userToken) {
            setLoggedIn(false);
        }
    }
    //Listens to changes to the auth context 
    useEffect(() => {
        console.log('context', context.state.userToken)
        
    }, [context])

    useEffect(() => {
        if(loggedIn == false) {
            navigation.setOptions({
                headerLeft: null,
                headerRight: () => (
                    <ConfirmButton navigateTo={["Auth", "Sign In"]}>
                        Sign In
                    </ConfirmButton>
                ),
            });
        }
        else {
            navigation.setOptions({
                headerLeft: () => (
                    <TextButton
                        style={{ paddingLeft: 15, paddingVertical: 5 }}
                        onPress={() => {
                            //TODO: Signing out... loading circle
                            //FUTURE: Modal = Are you sure you want to logout?
                            context.signOut().then((res) => {
                                
                                setLoggedIn(false);

                            });
                        }}
                    >
                            Logout
                    </TextButton>
                )
            });
        }
    }, [loggedIn])
    return (
        <View style={styles.container}>
            {/* Brand logo here */}

            {loggedIn && organization && <OrganizationHeader organization={organization} />}

            <View>
                {/* <SettingsButton useIcon>General</SettingsButton> */}
                <Accordion title="General">
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{  ...styles.boldStandardText, fontSize: 16 }}>Dark Mode</Text>
                        <Switch
                            trackColor={{ false: '#efefef', true: 'lightgreen' }}
                            thumbColor={'white'}
                            ios_backgroundColor="#efefef"
                            onValueChange={() => toggleSwitch(setDarkMode)}
                            value={darkMode}
                        />
                    </View>
                </Accordion>

                <Accordion title="Notifications">
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{  ...styles.boldStandardText, fontSize: 16 }}>Push Notifications</Text>
                            <Switch
                                trackColor={{ false: '#efefef', true: 'lightgreen' }}
                                thumbColor={'white'}
                                ios_backgroundColor="#efefef"
                                onValueChange={() => toggleSwitch(setPushNotifs)}
                                value={pushNotifs}
                            />
                    </View>
                </Accordion>

                <Accordion title="Help">
                    <View><Text>Test</Text></View>
                </Accordion>

                {/* <SettingsButton>Tell a Friend</SettingsButton> */}

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

            {
                loggedIn && !organization ? (
                    <View
                    style={{
                        marginTop: 25,
                        borderTopWidth: 1,
                        borderTopColor: "lightgray",
                        paddingVertical: 25,
                    }}
                    >
                        <AddOrganizationSection navigation={navigation} />
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
        console.log('Going to sign up screen...')
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

const AddOrganizationSection = ({ navigation }) => {
    
    function goToCreateOrg() {
        navigation.navigate('VendorPageSettings');
    }

    return (
        <View style={styles.registerSection}>
            <View style={styles.registerTextSection}>
                <Text style={{ ...styles.boldText, textAlign: "center" }}>
                    Haven't set up your organization yet?
                </Text>
                <Text style={{ ...styles.description, textAlign: "center" }}>
                    Setting up your organization information allows people in
                    your area to see the donation items you need!
                </Text>
            </View>
            <DisplayButton
                buttonStyle={root.barButton}
                textStyle={root.barButtonText}
                onPress={goToCreateOrg}
            >
                Click here to get started
            </DisplayButton>
        </View>
    );
};

const OrganizationHeader = ({ organization, navigation }) => {
    function goToOrg() {
        // navigation.navigate('')
    }
    return (
            <View style={{ ...styles.organization, maxWidth: '100%' }} onPress={goToOrg}>
                <View style={styles.orgImgContainer}>
                    <Image style={{ ...styles.image, width: 65, height: 65 }} source={logo}/>
                </View>
                <View style={{ display: 'flex', flexWrap: 'wrap', width: '80%'}}>
                    <View><Text style={styles.orgHeader}>{organization.name}</Text></View>
                    <View><Text style={{ ...styles.orgDescription }}>{organization.description}</Text></View>
                </View>
            </View>   
    )
}

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
    organization: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 12
    },
    orgImgContainer: {
        marginRight: 12
    },
    orgHeader: {
        fontSize: 24,
        color: "#706052",
        marginBottom: 0
    },
    orgDescription: {
        fontSize: 14,
        color: "#706052",
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
