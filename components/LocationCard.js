import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";

const LocationCard = ({ name, tags }) => {
    return (
        <View style={styles.mainContainer}>
            <Text>{name}</Text>
            {tags ? (
                <View style={styles.tagContainer}>
                    {tags.map((tag, i) => (
                        <View
                            key={tag + i}
                            style={[styles.tag, { marginRight: 6 }]}
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
        backgroundColor: "#ffffff",
        padding: 8,
        borderRadius: 8,
        width: "96%",
    },
    tagContainer: {
        marginTop: 4,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    tag: {
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 6,
    },
});

export default LocationCard;
