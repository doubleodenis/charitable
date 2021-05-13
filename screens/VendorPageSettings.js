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

import React, { useState } from "react";

import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Tag from "../components/Tag";
import Input from "../components/PrimaryInput";
import DisplayButton from "../components/DisplayButton";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';



const VendorPage = () => {
    const [charityName, setCharityName] = useState("");
    const [description, setDesc] = useState("");
    const [locations, setLocations] = useState([
        "12345 Merigold Lane, Miami, FL 44556",
    ]);

    const [missionTags, setMissionTags] = useState(["Women", "Kids"]);
    const [itemsNeeded, setItemsNeeded] = useState(["Clothes", "Food", "Toys"]);

    const [contactEmail, setEmail] = useState("");
    const [contactPhone, setPhone] = useState("");
    const [contactWebsite, setWebsite] = useState("");
    
    const tabBarHeight = useBottomTabBarHeight();
    console.log(tabBarHeight);

    function donate(e) {
        //...
    }

    function displayLocations() {
        return locations.map((l, idx) => (
            <Text key={idx} style={styles.description}>
                {l}
            </Text>
        ));
    }

    function displayTags(list) {
        return list.map((item, idx) => <Tag key={idx}>{item}</Tag>);
    }

    return (
        <ScrollView style={{...styles.container}}>
            <View style={styles.card}>
                <Text style={styles.sectionHeader}>Charity Name</Text>
                <Text style={styles.description} numberOfLines={2}>
                    This is the name that will appear on users maps and on your
                    info page.
                </Text>
                <Input
                    value={charityName}
                    placeholder="Charitable"
                    onChangeText={setCharityName}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionHeader}>Charity Locations</Text>
                <Text style={styles.description} numberOfLines={2}>
                    This is the name that will appear on users maps and on your
                    info page.
                </Text>
                <View>
                    <DisplayButton
                        buttonStyle={styles.displayButton}
                        textStyle={styles.buttonText}
                        text="Add or Remove Locations"
                        onPress={() => console.log("btn click")}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionHeader}>Charity Description</Text>
                <Text style={styles.description} numberOfLines={2}>
                    This is the name that will appear on users maps and on your
                    info page.
                </Text>
                <Input
                    value={description}
                    placeholder="A charity for people with big dreams and no toys."
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={setDesc}
                    style={{ height: 60 }}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionHeader}>What you need</Text>
                <Text style={styles.description} numberOfLines={2}>
                    This is the name that will appear on users maps and on your
                    info page.
                </Text>
                <DisplayButton
                    buttonStyle={styles.displayButton}
                    textStyle={styles.buttonText}
                    text="Add or Remove Accepted Items"
                    onPress={() => console.log("btn click")}
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionHeader}>Contact Info</Text>
                <Text style={styles.description} numberOfLines={2}>
                    This is the name that will appear on users maps and on your
                    info page.
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

            <View style={{ height: 75}}>
                <DisplayButton
                    buttonStyle={styles.displayButton}
                    textStyle={styles.buttonText}
                    text="Delete Charitable Account"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        height: "100%",
        margin: 0,
        padding: 20 
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
        // justifyContent: 'center',
        // textAlign: 'center',
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
        fontWeight: "300",
        textAlign: "center",
    },
});

export default VendorPage;
