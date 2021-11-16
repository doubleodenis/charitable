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

import React, { useState, useEffect, useLayoutEffect } from "react";

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    Modal,
    TouchableHighlight,
} from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { showMessage, hideMessage } from "react-native-flash-message";
//services
import OrganizationService from "../services/organization";
import SecureStorage from "../services/secureStorage";

//Components
import Input from "../components/PrimaryInput";
import DisplayButton from "../components/DisplayButton";
import DonationList from "../components/DonationList";
import SearchList from "../components/SearchList";
import SearchBar from "../components/SearchBar";
import ConfirmButton from "../components/ConfirmButton";

const VendorPage = () => {
    let navigation = useNavigation();

    const [organization, setOrganization] = useState({
        _id: null,
        acceptedItems: [],
        contactInfo: {
            email: "",
            phone: "",
            website: "",
        },
        description: "",
        location: {
            latitude: null,
            longitude: null,
            address: "",
        },
        missionCategories: [],
        name: "",
    });

    const [nameErr, setNameErr] = useState(null);
    const [descErr, setDescErr] = useState(null);
    const [locationErr, setLocationErr] = useState(null);

    const setMissions = (val) => {
        setOrganization((org) => ({ ...org, missionCategories: val }));
    };
    const [tagsErr, setTagsErr] = useState(null);

    const setItems = (val) => {
        setOrganization((org) => ({ ...org, acceptedItems: val }));
    };
    const [itemsErr, setItemsErr] = useState(null);

    //Styling variables
    const tabBarHeight = useBottomTabBarHeight();
    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ConfirmButton onPress={submitOrganization}>
                    Looks Good
                </ConfirmButton>
            ),
        });
    }, [organization]);

    useEffect(() => {
        OrganizationService.getCurrentOrganization()
            .then((res) => {
                //Fill the organization information out if it exists
                if (res) {
                    setOrganization((org) => ({ ...org, ...res }));
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
    }, []);

    let submitOrganization = () => {
        console.log("submitting", organization);
        if (organization._id != null) {
            //Not working just yet

            //Dirty code for geocoding the submitted string address before creating the org
            OrganizationService.geoCodeCoordinates(organization.location.address)
            .then((res) => {
                if(res.status === "OK"){
                    OrganizationService.updateOrganization(
                        organization._id,
                        {
                            //manually submitting the lat and long circumvents the need to wait for a state change
                            ...organization,
                            location: {
                                latitude: res.results[0].geometry.location.lat,
                                longitude: res.results[0].geometry.location.lng,
                                address: organization.location.address
                            }
                        }
                    )
                    .then((res) => {
                        //Navigate back to vendor page
                        navigation.navigate("VendorPage");

                        //Show error message
                        showMessage({
                            message: "Organization profile updated successfully",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log(err.response);

                        //Show error message
                        showMessage({
                            message: err.data.message,
                            type: "danger",
                        });

                        if (err.data?.length > 0) {
                            err.data.forEach((e) => {
                                switch (e.param) {
                                    case "name":
                                        setNameErr(e.msg);
                                        break;
                                    case "description":
                                        setDescErr(e.msg);
                                        break;
                                    case "location":
                                        setLocationErr(e.msg);
                                        break;
                                    case "acceptedItems":
                                        setItemsErr(e.msg);
                                        break;
                                    case "missionCategories":
                                        setMissionsErr(e.msg);
                                        break;
                                    case "contactInfo.email":
                                        break;
                                    case "contactInfo.phone":
                                        break;
                                    case "contactInfo.website":
                                        break;
                                }
                            });
                        }
                    });
                }
                else if(res.status === "ZERO_RESULTS"){
                    showMessage({
                        message: 'Zero results found for address',
                        type: "danger",
                    });
                }
            })
            .catch((err) => console.log(err))
        } else {
            OrganizationService.geoCodeCoordinates(organization.location.address)
            .then((res) => {
                if(res.status === "OK"){
                    OrganizationService.createOrganization({
                        //manually submitting the lat and long circumvents the need to wait for a state change
                        ...organization,
                        location: {
                            latitude: res.results[0].geometry.location.lat,
                            longitude: res.results[0].geometry.location.lng,
                            address: organization.location.address
                        }})
                    .then((res) => {
                        //Navigate back to vendor page
                        navigation.navigate("VendorPage");
    
                        //Show error message
                        showMessage({
                            message: "Organization profile created successfully",
                            type: "success",
                        });
                    })
                    .catch((err) => {
                        console.log("err", err);
    
                        //Show error message
                        showMessage({
                            message: err.data.message,
                            type: "danger",
                        });
                    });
                }
                else if(res.status === "ZERO_RESULTS"){
                    showMessage({
                        message: 'Zero results found for address',
                        type: "danger",
                    });
                }
            })
            .catch((err) => console.log(err))
            
        }
    };

    function inputChange(field, value) {
        let args = field.split(".");
        if (args.length == 1) {
            setOrganization((org) => ({ ...org, [field]: value }));
        } else {
            switch (args[0]) {
                case "contactInfo":
                    setOrganization((org) => ({
                        ...org,
                        contactInfo: {
                            ...org.contactInfo,
                            [args[1]]: value,
                        },
                    }));
                    break;
                case "location":
                    setOrganization((org) => ({
                        ...org,
                        location: {
                            ...org.location,
                            [args[1]]: value,
                        },
                    }));
                    break;
            }
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ height: "100%", width: "100%" }}
            keyboardVerticalOffset={-10}
        >
            <ScrollView
                style={{ ...styles.container, marginBottom: tabBarHeight }}
                contentInset={{ bottom: insets.bottom }}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={"handled"}
            >
                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Charity Name</Text>
                    <Text
                        style={styles.description}
                        multiline={true}
                        numberOfLines={4}
                    >
                        This is the name that will appear on users maps and on
                        your info page.
                    </Text>
                    <Input
                        value={organization.name}
                        placeholder="Charitable"
                        onChangeText={(e) => inputChange("name", e)}
                        error={nameErr}
                    />
                    <Text style={styles.formFieldErr}>{nameErr}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Charity Location</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        This is the location of your organization.
                    </Text>
                    <View>
                        <Input
                            value={organization.location.address}
                            placeholder="Address"
                            onChangeText={(e) =>
                                inputChange("location.address", e)
                            }
                            error={locationErr}
                        />

                        <Text style={styles.formFieldErr}>{locationErr}</Text>
                    </View>
                    {/* <View style={{ marginBottom: 12 }}>
                        <Input
                            value={organization.location.latitude}
                            placeholder=""
                            onChangeText={(e) => inputChange('location.latitude', e)}
                            error={locationErr}
                        />
                    </View>
                    <View>
                        <Input
                            value={organization.location.longitude}
                            placeholder=""
                            onChangeText={(e) => inputChange('location.latitude', e)}
                            error={locationErr}
                        />
                    </View> */}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>
                        Charity Description
                    </Text>
                    <Text style={styles.description} numberOfLines={4}>
                        This is the description that will appear to users on
                        your organization page.
                    </Text>
                    <Input
                        value={organization.description}
                        placeholder="Your description for your charity goes here."
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(e) => inputChange("description", e)}
                        style={{ height: 60 }}
                        error={descErr}
                    />
                    <Text style={styles.formFieldErr}>{descErr}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>What you need</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        These are the items that your organization is looking
                        for.
                    </Text>
                    <ItemSearch
                        items={organization.acceptedItems}
                        missions={organization.missionCategories}
                        setItems={setItems}
                        setMissions={setMissions}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Contact Info</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        This is the name that will appear on users maps and on
                        your info page.
                    </Text>
                    <Input
                        label="Email"
                        placeholder="example@email.com"
                        value={organization.contactInfo.email}
                        style={{ marginBottom: 10 }}
                        onChangeText={(e) =>
                            inputChange("contactInfo.email", e)
                        }
                    />

                    <Input
                        label="Phone"
                        placeholder="XXX-XXX-XXXX"
                        value={organization.contactInfo.phone}
                        style={{ marginBottom: 10 }}
                        onChangeText={(e) =>
                            inputChange("contactInfo.phone", e)
                        }
                    />

                    <Input
                        label="Website"
                        placeholder="www.example.com"
                        value={organization.contactInfo.website}
                        style={{ marginBottom: 10 }}
                        onChangeText={(e) =>
                            inputChange("contactInfo.website", e)
                        }
                    />
                </View>

                {organization._id !== null ? (
                    <View style={{ height: 75 }}>
                        <DisplayButton
                            buttonStyle={{
                                ...styles.displayButton,
                                backgroundColor: "lightred",
                            }}
                            textStyle={styles.buttonText}
                            text="Delete Charitable Account"
                        />
                    </View>
                ) : null}
            </ScrollView>
        </KeyboardAvoidingView>
        // {/* </SafeAreaView> */}
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        margin: 0,
        padding: 20,
    },
    card: {
        marginBottom: 10,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        //Box shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 5,
    },
    // section: {
    //     textAlign: "left",
    //     justifyContent: "flex-start",
    //     marginBottom: 20,
    // },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 5,
        color: "#311700",
    },
    textButton: {
        color: "#8BC178",
        fontSize: 14,
    },
    description: {
        fontSize: 14,
        color: "#706052",
        lineHeight: 20,
        marginBottom: 10,
    },
    displayButton: {
        backgroundColor: "#D77944",
        marginVertical: 5,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
    },
});

export default VendorPage;

const ItemSearch = ({ items, missions, setItems, setMissions }) => {
    const [searching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchPressed, setSearchPressed] = useState(false);

    return (
        <View>
            <SearchBar
                searching={searching}
                setSearching={setSearching}
                searchQuery={searchQuery.trim()}
                setSearchQuery={setSearchQuery}
                setSearchPressed={setSearchPressed}
            />
            {searching ? (
                <SearchList
                    isUser={false}
                    itemList={items}
                    setItemList={setItems}
                    missionList={missions}
                    setMissionList={setMissions}
                    searchQuery={searchQuery.trim()}
                    setSearchQuery={setSearchQuery}
                    searchPressed={searchPressed}
                    setSearchPressed={setSearchPressed}
                />
            ) : (
                <>
                    <DonationList
                        isUser={false}
                        itemList={items}
                        missionList={missions}
                        setItemList={setItems}
                        setMissionList={setMissions}
                    />
                </>
            )}
        </View>
    );
};
