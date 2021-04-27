import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const PrimaryInput = ({onChangeText, value, label=null, placeholder='', style, ...inputProps}) => {
    const [borderColor, setBorderColor] = useState('#D77944');
    
    function onFocus(e) {
        setBorderColor('#974C20')
    }
    function onBlur(e) {
        setBorderColor('#D77944')
    }
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                    style={{...styles.textInput, borderColor: borderColor, ...style }}
                    onChangeText={onChangeText}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    {...inputProps}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 35,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 8,
        fontSize: 18,
        color: '#676767',
        fontWeight: '400',
        // lineHeight: 20
      },
      label: {
          fontSize: 14,
          color: "#706052",
          marginBottom:3,
          marginLeft: 5
      }
})
export default PrimaryInput;