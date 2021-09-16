/**
 * Small rectangular tags.
 * Child should be plain text.
 * 
 * @param tooltip When clicked will bring up a tooltip. Insert the text for the tooltip
 * @param draggable When held, can be dragged
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from "react-native";  

const Tag = ({ children, tooltip, draggable, style}) => {
    return (
        <View 
        style={style ? style : styles.tag}>
            {/* <TouchableOpacity
                // onPress={onPress} */}
            <View>
                <Text style={styles.text}>{children}</Text>
                </View>
            {/* </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    tag: {
        // alignSelf: 'center', 
        // height: 'auto',
        // width: 'auto',
        borderRadius: 5,
        borderColor: "lightgray",
        borderWidth: 1,
        textAlign: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        marginRight: 10,
        marginBottom: 8
    },
    text: {
        fontSize: 14,
        fontWeight: "500",
        color: "gray"
        // flex: 1,
        // flexWrap: 'wrap'
        // flexDirection: 'row'
    }
  });
export default Tag;