import React, { useState, useEffect, Fragment } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import LocationCard from "../components/LocationCard";
import DisplayButton from "../components/DisplayButton";
// import locations from "../mock_data/locations";
import OrganizationService from "../services/organization";

const HORIZONTAL_MARGIN = 8;
const LAT_DELTA = 0.0922; // Not sure what this dictates but I believe it's the initial map zoom
const LNG_DELTA = 0.0421;
const MARKER_VERIFIED_COLOR = "#258fe6"; // Neutral colors don't work
const MARKER_UNVERIFIED_COLOR = "#f52f4c"; // Neutral colors don't work

const Map = () => {
    const [organizations, setOrganizations] = useState([]);
    const [location, setLocation] = useState(null);
    const [showList, setShowList] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [locationPermissionStatus, setLocationPermissionStatus] =
        useState("Loading");

    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();

            if (status !== "granted") {
                setLocationPermissionStatus("Denied");
                return;
            }

            let currentPosition = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LNG_DELTA,
            });

            setLocationPermissionStatus("Granted");
        })();

        OrganizationService.getOrganizations()
            .then((res) => {
                setOrganizations(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const centerMap = () => {
        (async () => {
            // Center button should only be available if the user granted the app location permission, that's why permission is not rechecked
            let currentPosition = await Location.getCurrentPositionAsync({});

            setLocation({
                latitude: currentPosition.coords.latitude,
                longitude: currentPosition.coords.longitude,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LNG_DELTA,
            });

            console.log("Map Center Pressed!");
        })();
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
                <LocationCard
                    name={item.name}
                    tags={item.acceptedItems}
                    verified={item.verified}
                    id={item._id}
                />
            </View>
        );
    };

    const listSpacing = () => {
        return <View style={{ height: 8 }} />;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {locationPermissionStatus == "Loading" && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                        Loading user location...
                    </Text>
                </View>
            )}
            {locationPermissionStatus == "Granted" && (
                <View style={{ flex: 1, position: "relative" }}>
                    <MapView
                        style={{ flex: 1 }}
                        region={location}
                        onRegionChangeComplete={(region) => setLocation(region)}
                        showsUserLocation={true}
                        rotateEnabled={false}
                        showsCompass={false}
                        showsMyLocationButton={false}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyle}
                        onPress={() => {
                            if (selectedOrg) {
                                setSelectedOrg(null);
                            }
                        }}
                    >
                        {organizations &&
                            organizations.map((place, i) => {
                                return (
                                    place.location &&
                                    place.location.latitude &&
                                    place.location.longitude && (
                                        <Marker
                                            key={place.name + i}
                                            coordinate={{
                                                latitude:
                                                    place.location.latitude,
                                                longitude:
                                                    place.location.longitude,
                                            }}
                                            title={place.name}
                                            pinColor={
                                                place.verified
                                                    ? MARKER_VERIFIED_COLOR
                                                    : MARKER_UNVERIFIED_COLOR
                                            }
                                            onPress={() => {
                                                setSelectedOrg({
                                                    name: place.name,
                                                    acceptedItems:
                                                        place.acceptedItems,
                                                    verified: place.verified,
                                                    _id: place._id,
                                                });
                                            }}
                                        />
                                    )
                                );
                            })}
                    </MapView>
                    {showList ? (
                        <View style={styles.mapOverlay}>
                            <View style={[styles.header]}>
                                <DisplayButton
                                    buttonStyle={styles.listActiveButton}
                                    textStyle={styles.buttonText}
                                    onPress={handleShowList}
                                >
                                    Hide List
                                </DisplayButton>
                                <View style={{ flexDirection: "row" }}>
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
                            <FlatList
                                contentContainerStyle={{
                                    paddingBottom: tabBarHeight,
                                }}
                                data={organizations}
                                renderItem={renderItem}
                                keyExtractor={(item) => item._id}
                                ListHeaderComponent={listSpacing}
                                ItemSeparatorComponent={listSpacing}
                                ListFooterComponent={listSpacing}
                            />
                        </View>
                    ) : (
                        <Fragment>
                            <DisplayButton
                                buttonStyle={[
                                    { position: "absolute", top: 8, left: 8 },
                                    styles.button,
                                ]}
                                textStyle={styles.buttonText}
                                onPress={handleShowList}
                            >
                                View List
                            </DisplayButton>
                            <DisplayButton
                                buttonStyle={[
                                    { position: "absolute", top: 8, right: 8 },
                                    styles.button,
                                ]}
                                textStyle={styles.buttonText}
                                onPress={centerMap}
                            >
                                Center
                            </DisplayButton>
                            {selectedOrg && (
                                <View
                                    style={{
                                        position: "absolute",
                                        width:
                                            Dimensions.get("window").width -
                                            HORIZONTAL_MARGIN * 2,
                                        bottom: tabBarHeight + 8,
                                        marginHorizontal: HORIZONTAL_MARGIN,
                                    }}
                                >
                                    <LocationCard
                                        name={selectedOrg.name}
                                        tags={selectedOrg.acceptedItems}
                                        verified={selectedOrg.verified}
                                        id={selectedOrg._id}
                                    />
                                </View>
                            )}
                        </Fragment>
                    )}
                </View>
            )}
            {locationPermissionStatus == "Denied" && (
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                        This app requires access to your location
                    </Text>
                </View>
            )}
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
        backgroundColor: "#ffffff",
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    statusContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFBF8",
    },
    statusText: {
        fontSize: 20,
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
