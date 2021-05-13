import React, { Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";

const INTER_TAG_MARGIN = 6;

const LocationCard = ({ name, tags }) => {
    return (
        <View
            style={[
                styles.mainContainer,
                { paddingBottom: tags ? 10 - INTER_TAG_MARGIN : 10 },
            ]}
        >
            <Text style={styles.header}>{name}</Text>
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
        fontSize: 18,
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
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
});

export default LocationCard;
