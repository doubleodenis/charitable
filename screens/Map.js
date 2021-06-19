import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import MapView, { Marker } from "react-native-maps";
import LocationCard from "../components/LocationCard";
import DisplayButton from "../components/DisplayButton";
// import locations from "../mock_data/locations";

const HORIZONTAL_MARGIN = 8;

const Map = () => {
    const [showList, setShowList] = useState(false);

    const tabBarHeight = useBottomTabBarHeight();

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

    const listSpacing = () => {
        return <View style={{ height: 8 }} />;
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
        // borderBottomLeftRadius: 8,
        // borderBottomRightRadius: 8,
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
