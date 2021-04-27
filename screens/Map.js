import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import LocationCard from "../components/LocationCard";
import DisplayButton from "../components/DisplayButton";

// Dummy Data
const locations = [
    {
        name: "West Side Charity",
        needed: ["Clothes", "Toiletries", "Food"],
    },
    {
        name: "House of the Charitable Mother, Rosalia",
        needed: ["Clothes", "Toiletries", "Food", "Furniture", "Love"],
    },
    {
        name: "Help N' Stuff",
        needed: ["Beds", "Pillows", "Sheets"],
    },
    {
        name: "Maybe Helpful, Plenty Loveful",
    },
    {
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
];

const Map = () => {
    const centerMap = () => {
        console.log("Map Centered!");
    };

    const sortLocations = () => {
        console.log("Locations Sorted!");
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
                />
                <View style={styles.mapOverlay}>
                    <View style={styles.buttonsContainer}>
                        <DisplayButton
                            text={"Center"}
                            buttonStyle={[styles.button, { marginRight: 6 }]}
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
                    <View style={styles.locationCardsContainer}>
                        {locations.map((location, i) => (
                            <View
                                key={location + i}
                                style={[
                                    styles.cardSpacer,
                                    {
                                        marginTop: i == 0 ? 6 : 0,
                                        marginBottom: 6,
                                    },
                                ]}
                            >
                                <LocationCard
                                    name={location.name}
                                    tags={location.needed}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mapOverlay: {
        position: "absolute",
        left: 6,
        right: 6,
    },
    buttonsContainer: {
        justifyContent: "flex-end",
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
    locationCardsContainer: {
        alignItems: "center",
        flex: 1,
    },
    cardSpacer: {
        width: "100%",
        alignItems: "center",
    },
});

export default Map;
