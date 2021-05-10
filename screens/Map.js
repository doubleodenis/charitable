import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import LocationCard from "../components/LocationCard";
import DisplayButton from "../components/DisplayButton";

// Dummy Data
const LOCATIONS = [
    {
        id: "loc-1",
        name: "West Side Charity",
        needed: ["Clothes", "Toiletries", "Food"],
    },
    {
        id: "loc-2",
        name: "House of the Charitable Mother, Rosalia",
        needed: ["Clothes", "Toiletries", "Food", "Furniture", "Love"],
    },
    {
        id: "loc-3",
        name: "Help N' Stuff",
        needed: ["Beds", "Pillows", "Sheets"],
    },
    {
        id: "loc-4",
        name: "Maybe Helpful, Plenty Loveful",
    },
    {
        id: "loc-5",
        name: "A Little Bit of Anything for Everybody",
        needed: [
            "Apples",
            "Oranges",
            "Tomatoes",
            "Lettuce",
            "Tangerine",
            "Tangerong",
            "Tango-Foxtrot",
            "Dolls",
        ],
    },
    {
        id: "loc-6",
        name: "Juicy Donations",
        needed: ["Apples", "Oranges", "Tomatoes"],
    },
    {
        id: "loc-7",
        name: "Fairly Generous House",
        needed: [
            "Obtuse",
            "Rubber Goose",
            "Green Moose",
            "Guava Juice",
            "Giant Snake",
            "Birthday Cake",
            "Large Fries",
            "Chocolate Shake",
        ],
    },
    {
        id: "loc-8",
        name: "The Best Charity",
        needed: ["Papers, Rocks, Scissors"],
    },
];

const Map = () => {
    const [showList, setShowList] = useState(true);

    const centerMap = () => {
        console.log("Map Centered!");
    };

    const sortLocations = () => {
        console.log("Locations Sorted!");
    };

    const handleShowList = () => {
        setShowList(!showList);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardContainer}>
                <LocationCard name={item.name} tags={item.needed} />
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, position: "relative" }}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true} // TODO
                    rotateEnabled={false}
                    showsCompass={false}
                    customMapStyle={mapStyle}
                />
                <View style={styles.mapOverlay}>
                    <View style={styles.buttonsContainer}>
                        <DisplayButton
                            text={showList ? "Hide List" : "View List"}
                            buttonStyle={styles.button}
                            textStyle={styles.buttonText}
                            onPress={handleShowList}
                        />
                        <View style={{ flexDirection: "row" }}>
                            <DisplayButton
                                text={"Center"}
                                buttonStyle={[
                                    styles.button,
                                    { marginRight: 6 },
                                ]}
                                textStyle={styles.buttonText}
                                onPress={centerMap}
                            />
                            <DisplayButton
                                text={"Sort"}
                                buttonStyle={styles.button}
                                textStyle={styles.buttonText}
                                onPress={sortLocations}
                            />
                        </View>
                    </View>
                    {showList && (
                        <View style={styles.listContainer}>
                            <FlatList
                                data={LOCATIONS}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                        // <FlatList
                        //     data={LOCATIONS}
                        //     renderItem={renderItem}
                        //     keyExtractor={(item) => item.id}
                        // />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mapOverlay: {
        flex: 1,
        position: "absolute",
        left: 8,
        right: 8,
    },
    buttonsContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 6,
    },
    button: {
        borderRadius: 8,
        backgroundColor: "#ffffff",
        paddingVertical: 5,
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        fontSize: 18,
    },
    listContainer: {
        flex: 1,
        marginVertical: 4,
    },
    cardContainer: {
        marginVertical: 4,
    },
});

const mapStyle = [
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "poi",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
];

export default Map;
