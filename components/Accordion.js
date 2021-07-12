import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
    Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Accordion = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    const animatedController = useRef(new Animated.Value(0)).current;
    const [bodySectionHeight, setBodySectionHeight] = useState(0);

    const bodyHeight = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: [0, bodySectionHeight],
    });

    const arrowAngle = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ["0rad", `${Math.PI}rad`],
    });

    const toggleListItem = () => {
        if (open) {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 0,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(animatedController, {
                duration: 300,
                toValue: 1,
                easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                useNativeDriver: false,
            }).start();
        }
        setOpen(!open);
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={() => toggleListItem()}>
                <View style={styles.accordionContainer}>
                    <Text style={styles.boldStandardText}>{title}</Text>
                    <Animated.View
                        style={{ transform: [{ rotateZ: arrowAngle }] }}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color="#706052"
                        />
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View
                style={[{ overflow: 'hidden', marginBottom: 10, height: bodyHeight}]}
            >
                <View
                    style={styles.bodyContainer}
                    onLayout={(event) =>
                        setBodySectionHeight(event.nativeEvent.layout.height)
                    }
                >
                    {children}
                </View>
            </Animated.View>
        </>
    );
};
export default Accordion;

const styles = StyleSheet.create({
    bodyBackground: {
        backgroundColor: "#EFEFEF",
        overflow: "hidden",
    },
    titleContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // padding: 10,
        // paddingLeft: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#EFEFEF",
    },
    bodyContainer: {
        width: '100%',
        padding: 10,
        paddingLeft: 15,
        position: "absolute",
        bottom: 0,
    },
    accordionContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        // padding: 10,
        // paddingLeft: 15,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderColor: "#EFEFEF",
        // height: 45,
        // width: "100%",
    },
    boldStandardText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#706052",
    },
    boldText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#706052",
    },
});
