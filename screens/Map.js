import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LocationCard from "../components/LocationCard";
import DisplayButton from "../components/DisplayButton";
import locations from "../mock_data/locations";

const HORIZONTAL_MARGIN = 8;
const LAT_DELTA = 0.0922;
const LNG_DELTA = 0.0421;

const Map = () => {
    const [location, setLocation] = useState(null);
    const [showList, setShowList] = useState(false);

    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== "granted") {
                return;
            }

            let currentPosition = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LNG_DELTA,
            });
        })();
    }, []);

    // TESTING
    useEffect(() => {
        if (location) {
            console.log("Location: ", location);
            console.log("Latitude: ", location.latitude);
        }
    }, [location]);

    const centerMap = () => {
        console.log("Map Centered!");

        setLocation({ ...location });
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

    const listSpacing = () => {
        return <View style={{ height: 8 }} />;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, position: "relative" }}>
                <MapView
                    style={{ flex: 1 }}
                    region={location}
                    showsUserLocation={true} // TODO
                    rotateEnabled={false}
                    showsCompass={false}
                    showsMyLocationButton={false}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={mapStyle}
                >
                    {locations &&
                        locations.map((place, i) => {
                            return (
                                place.location && (
                                    <Marker
                                        key={place.name + i}
                                        coordinate={{
                                            latitude: place.location.latitude,
                                            longitude: place.location.longitude,
                                        }}
                                        title={place.name}
                                        pinColor={place.verified && "#2d57cc"}
                                    />
                                )
                            );
                        })}
                </MapView>
                <View style={styles.mapOverlay}>
                    <View
                        style={[
                            styles.header,
                            showList ? styles.listActiveHeader : "",
                        ]}
                    >
                        <DisplayButton
                            buttonStyle={
                                showList
                                    ? styles.listActiveButton
                                    : styles.button
                            }
                            textStyle={styles.buttonText}
                            onPress={handleShowList}
                        >
                            {showList ? "Hide List" : "View List"}
                        </DisplayButton>
                        <View style={{ flexDirection: "row" }}>
                            <DisplayButton
                                buttonStyle={[
                                    showList
                                        ? styles.listActiveButton
                                        : styles.button,
                                    { marginRight: 8 },
                                ]}
                                textStyle={styles.buttonText}
                                onPress={centerMap}
                            >
                                Center
                            </DisplayButton>
                            <DisplayButton
                                buttonStyle={
                                    showList
                                        ? styles.listActiveButton
                                        : styles.button
                                }
                                textStyle={styles.buttonText}
                                onPress={sortLocations}
                            >
                                Sort
                            </DisplayButton>
                        </View>
                    </View>
                    {showList && (
                        <FlatList
                            contentContainerStyle={{
                                paddingBottom: tabBarHeight,
                            }}
                            data={locations}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            ListHeaderComponent={listSpacing}
                            ItemSeparatorComponent={listSpacing}
                            ListFooterComponent={listSpacing}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mapOverlay: {
        flex: 1,
        height: "100%",
        position: "absolute",
    },
    header: {
        width: Dimensions.get("window").width,
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: HORIZONTAL_MARGIN,
    },
    listActiveHeader: {
        backgroundColor: "#ffffff",
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
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
    listActiveButton: {
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonText: {
        fontSize: 18,
    },
    cardContainer: {
        marginHorizontal: HORIZONTAL_MARGIN,
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
