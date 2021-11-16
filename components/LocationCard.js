import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FoundationIcon from "react-native-vector-icons/Foundation";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const INTER_TAG_MARGIN = 6;
const DEFUALT_ICON_COLOR = "#696969";
const VERIFIED = "#258fe6";
const FAVORITED = "red";

const LocationCard = ({
    name,
    tags,
    verified,
    favorited,
    id,
    updateFavorites,
}) => {
    let navigation = useNavigation();

    return (
        <View
            style={[
                styles.mainContainer,
                { paddingBottom: tags ? 10 - INTER_TAG_MARGIN : 10 },
            ]}
        >
            <View style={styles.header}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                        marginRight: verified ? 18 : 4,
                    }}
                >
                    <Text
                        style={styles.headerText}
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        {name}
                    </Text>
                    {verified && (
                        <FontAwesomeIcon
                            name="check-circle"
                            style={{
                                fontSize: 26,
                                color: VERIFIED,
                                marginLeft: 8,
                            }}
                        />
                    )}
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Favorited " + name + "!");
                            updateFavorites();
                        }}
                    >
                        <FontAwesomeIcon
                            name="heart"
                            style={{
                                fontSize: 26,
                                color: favorited
                                    ? FAVORITED
                                    : DEFUALT_ICON_COLOR,
                                marginRight: 8,
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("VendorPage", {
                                organizationId: id,
                            })
                        }
                    >
                        <FoundationIcon
                            name="info"
                            style={{
                                fontSize: 32,
                                color: DEFUALT_ICON_COLOR,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {tags ? (
                <View style={styles.tagContainer}>
                    {tags.map((tag, i) => (
                        <View
                            key={tag + i}
                            style={[
                                styles.tag,
                                {
                                    marginRight: INTER_TAG_MARGIN,
                                    marginBottom: INTER_TAG_MARGIN,
                                },
                            ]}
                        >
                            <Text>{tag}</Text>
                        </View>
                    ))}
                </View>
            ) : (
                <Fragment />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 8,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -4,
        marginBottom: 2,
    },
    headerText: {
        fontSize: 18,
    },
    iconContainer: {
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default LocationCard;
