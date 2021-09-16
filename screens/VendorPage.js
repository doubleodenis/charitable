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

import { StyleSheet, Text, View, Image } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import Tag from "../components/Tag";
import logo from "../assets/Charitable_Logo.png";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { showMessage, hideMessage } from "react-native-flash-message";

import SecureStorage from "../services/secureStorage";

import OrganizationService from "../services/organization";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ScrollView } from "react-native-gesture-handler";

const VendorPage = ({ route }) => {
    let navigation = useNavigation();
    // let params;
    // if(route)
    //     params = route.params;

    const tabBarHeight = useBottomTabBarHeight();

    const insets = useSafeAreaInsets();
    // });

    const [organization, setOrganization] = useState(null);

    useEffect(() => {
        let params = {};
        if(route && route.params) {
            params = route.params;
            console.log(route)
        }
            
        // let { organizationId } = route.params;
        if (params.organizationId) {
            OrganizationService.getOrganizationById(params.organizationId)
                .then((res) => {
                    console.log("org", res);
                    if (res) {
                        setOrganization(res);
                    } else {
                        navigation.navigate("Map");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    // console.log(err.response);

                    // Show error message
                    showMessage({
                        message: err.message,
                        type: "danger",
                    });

                    navigation.navigate("Map");
                });
        } else {
            // navigation.navigate("Map");

            OrganizationService.getCurrentOrganization()
            .then((res) => {
                // console.log('current', res);
                //Fill the organization information out if it exists
                if (res) {
                    setOrganization(res);
                } else {
                    navigation.navigate("Settings");
                }

            })
            .catch((err) => {
                console.log(err);
                console.log(err.data);

                //Show error message
                showMessage({
                    message: err.data.message,
                    type: "danger",
                });
            });
            
        }
    }, []);

    function displayTags(list) {
        return list.map((item, idx) => <Tag key={idx}>{item}</Tag>);
    }

    return (
        // <View
        //     style={{
        //         justifyContent: "center",
        //         alignItems: "center",
        //         height: "100%",
        //         margin: 0,
        //         padding: 20,
        //     }}
        // >
        <ScrollView
            style={{ ...styles.container, marginBottom: tabBarHeight }}
            contentInset={{ bottom: insets.bottom + tabBarHeight }}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={logo} style={styles.image} />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.orgHeader}>{organization?.name}</Text>

                    <View nativeID="locations-section" style={styles.section}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.sectionHeader}>Locations</Text>
                        </View>
                        <View
                            style={{
                                width: "75%",
                                flexWrap: "wrap",
                                flexDirection: "row",
                            }}
                        >
                            <Text style={styles.description}>
                                {organization?.location.address}
                            </Text>
                            {/* {organization?.locations.length > 0 ? displayLocations() : <Text>None</Text>} */}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Who We Are</Text>
                        <Text style={styles.description} numberOfLines={5}>
                            {organization?.description}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Mission Tags</Text>
                        <View style={{ flexDirection: "row" }}>
                            {organization?.missionCategories
                                ? displayTags(organization.missionCategories)
                                : null}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>What We Need</Text>
                        <View style={{ flexDirection: "row", flexWrap: 'wrap',  }}>
                            {organization?.acceptedItems
                                ? displayTags(organization.acceptedItems)
                                : null}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>
                            How To Reach Us
                        </Text>
                        <View>
                            {organization?.contactInfo ? (
                                <Text style={styles.description}>
                                    Email: {organization.contactInfo.email}
                                    {"\n"}
                                    Phone: {organization.contactInfo.phone}
                                    {"\n"}
                                    Website: {organization.contactInfo.website}
                                </Text>
                            ) : null}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        width: "100%",
        // margin: 'auto',
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        //Box shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    section: {
        textAlign: "left",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    contentContainer: {
        // margin: '3%'
    },
    title: {
        fontSize: 32,
    },
    imageContainer: {
        flex: 1,
        maxHeight: 200,
        alignItems: "center",
        marginVertical: 10,
    },
    image: {
        height: 145,
        width: 120,
        resizeMode: "cover",
    },
    orgHeader: {
        fontSize: 32,
        textAlign: "center",
        color: "#8BC178",
        marginBottom: 10,
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

export default VendorPage;
