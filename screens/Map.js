import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import LocationCard from "../components/LocationCard";

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
];

const Map = () => {
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
                />
                <View style={styles.locationCardsContainer}>
                    {locations.map((location, i) => (
                        <View
                            key={location + i}
                            style={[
                                styles.cardSpacer,
                                { marginTop: i == 0 ? 6 : 0, marginBottom: 6 },
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    locationCardsContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
    },
    cardSpacer: {
        width: "100%",
        alignItems: "center",
    },
});

export default Map;
