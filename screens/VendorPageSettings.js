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
import Tag from "../components/Tag";
import Input from "../components/PrimaryInput";
import DisplayButton from "../components/DisplayButton";
import DonationList from "../components/DonationList";
import SearchList from "../components/SearchList";
import SearchBar from "../components/SearchBar";
import ConfirmButton from "../components/ConfirmButton";

const VendorPage = () => {
    let navigation = useNavigation();

    const [charityName, setCharityName] = useState("");
    const [nameErr, setNameErr] = useState(false);

    const [description, setDesc] = useState("");
    const [descErr, setDescErr] = useState(false);

    const [location, setLocation] = useState("");
    const [locationErr, setLocationErr] = useState(false);

    const [missions, setMissions] = useState([]);
    const [tagsErr, setTagsErr] = useState(false);

    const [items, setItems] = useState([]);
    const [itemsErr, setItemsErr] = useState(false);

    const [contactEmail, setEmail] = useState("");
    const [contactPhone, setPhone] = useState("");
    const [contactWebsite, setWebsite] = useState("");

    const [orgId, setOrgId] = useState(null);

    const [openModal, setOpen] = useState(false);

    const tabBarHeight = useBottomTabBarHeight();

    const insets = useSafeAreaInsets();

    useEffect(() => {
        console.log(charityName);
    }, [charityName])
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ConfirmButton onPress={() => submitOrganization()}>
                    Looks Good
                </ConfirmButton>
            )
        })

        OrganizationService.getCurrentOrganization()
            .then((res) => {
                console.log('current', res);
                //Fill the organization information out if it exists
                if (res) {
                    setCharityName(res.name);
                    setDesc(res.description);
                    setLocation(res.location);
                    setMissions(res.missionCategories);
                    setItems(res.acceptedItems);
                    setEmail(res.contactInfo.email);
                    setPhone(res.contactInfo.phone);
                    setWebsite(res.contactInfo.website);

                    setOrgId(res._id);
                } 

            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);

                //Show error message
                showMessage({
                    message: err.message,
                    type: "danger",
                });
            });
            
    }, []);

    // function displayLocations() {
    //     return locations.map((l, idx) => (
    //         <Text key={idx} style={styles.description}>
    //             {l}
    //         </Text>
    //     ));
    // }

    function submitOrganization() {
        //! TODO: Add form validations

        let data = {
            name: charityName,
            description: description,
            location: location,
            acceptedItems: items,
            missionCategories: missions,
            contactInfo: {
                phone: contactPhone,
                email: contactEmail,
                website: contactWebsite
            }
        }
        console.log(orgId, data)
        if(orgId !== null) {
            //Not working just yet
            OrganizationService.updateOrganization(orgId, data)
            .then((res) => {
                //Navigate back to vendor page
                navigation.navigate('OrganizationPage')

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
                    message: err.message,
                    type: "danger",
                });
            });
        }
        else {
            OrganizationService.createOrganization(data)
                .then((res) => {
                    //Navigate back to vendor page
                    navigation.navigate('OrganizationPage')

                    //Show error message
                    showMessage({
                        message: "Organization profile created successfully",
                        type: "success",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    console.log(err.response);

                    //Show error message
                    showMessage({
                        message: err.message,
                        type: "danger",
                    });
                });
        }
        
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{  height: '100%', width: '100%'}}
            keyboardVerticalOffset={-10}
        >
            <ScrollView 
                style={{...styles.container, marginBottom: tabBarHeight }}
                contentInset={{ bottom: insets.bottom }}
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps={"handled"}
            >
                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Charity Name</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        This is the name that will appear on users maps and on
                        your info page.
                    </Text>
                    <Input
                        value={charityName}
                        placeholder="Charitable"
                        onChangeText={setCharityName}
                        error={nameErr}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>Charity Location</Text>
                    <Text style={styles.description} numberOfLines={2}>
                        This is the location of your organization.
                    </Text>
                    <View>
                        <Input
                            value={location}
                            placeholder="123 NW Charitable Street"
                            onChangeText={setLocation}
                            error={locationErr}
                        />
                        {/* <DisplayButton
                        buttonStyle={styles.displayButton}
                        textStyle={styles.buttonText}
                        onPress={() => console.log("btn click")}
                    >
                        Edit Locations    
                    </DisplayButton> */}
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>
                        Charity Description
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                        This is the description that will appear to users on
                        your organization page.
                    </Text>
                    <Input
                        value={description}
                        placeholder="A charity for people with big dreams and no toys."
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={setDesc}
                        style={{ height: 60 }}
                        error={descErr}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionHeader}>What you need</Text>
                    <Text style={styles.description} numberOfLines={2}>
                    These are the items that your organization is looking for.
                </Text>
                    {/* <DisplayButton
                    buttonStyle={styles.displayButton}
                    textStyle={styles.buttonText}
                    text="Add or Remove Accepted Items"
                    onPress={() => setOpen(true)}
                >
                    Edit Accepted Items
                </DisplayButton> */}
                    <ItemSearch items={items} missions={missions} setItems={setItems} setMissions={setMissions}/>
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
                        value={contactEmail}
                        style={{ marginBottom: 10 }}
                        onChangeText={setEmail}
                    />

                    <Input
                        label="Phone"
                        placeholder="XXX-XXX-XXXX"
                        value={contactPhone}
                        style={{ marginBottom: 10 }}
                        onChangeText={setPhone}
                    />

                    <Input
                        label="Website"
                        placeholder="www.example.com"
                        value={contactWebsite}
                        style={{ marginBottom: 10 }}
                        onChangeText={setWebsite}
                    />
                </View>

                {orgId !== null ? (
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
                {/* <AcceptedItemsModal open={openModal} setItems={setItemsNeeded} /> */}
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

    const dummyData = [];
    const dummyMissions = [];

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

            {/* <DonationListCard isUser={false} items={dummyData} missions={dummyMissions} searching={searching} setSearching={setSearching}/> */}
            {/* <DonationList 
                    isUser={true}
                    itemList={dummyData} 
                    missionList={dummyMissions}
                    setItemList={setItems}
                    setMissionList={setMissions}
                />  */}
        </View>
    );
};

const AcceptedItemsModal = ({ open, setItemsNeeded }) => {
    const [visible, setVisible] = useState(false);

    const [searching, setSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState([]);
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        setVisible(open);
    }, [open]);

    const dummyData = [];
    const dummyMissions = [];

    return (
        <View style={modalStyles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <SearchList
                            isUser={false}
                            itemList={items}
                            setItemList={setItems}
                            missionList={missions}
                            setMissionList={setMissions}
                            searchQuery={searchQuery.trim()}
                            setSearchQuery={setSearchQuery}
                        />
                        {/* <DonationListCard isUser={false} items={dummyData} missions={dummyMissions} searching={searching} setSearching={setSearching}/> */}
                        {/* <DonationList 
                        isUser={true}
                        itemList={dummyData} 
                        missionList={dummyMissions}
                        setItemList={setItems}
                        setMissionList={setMissions}
                    />  */}
                        <TouchableHighlight
                            style={{
                                ...modalStyles.openButton,
                                backgroundColor: "#2196F3",
                            }}
                            onPress={() => {
                                setVisible(!visible);
                            }}
                        >
                            <Text style={modalStyles.textStyle}>
                                Hide Modal
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //   marginTop: 22,
        backgroundColor: "rgba(0,0,0,0.3)",
        width: "100%",
        height: "100%",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
