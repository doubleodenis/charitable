import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const PrimaryInput = ({onChangeText, value, label=null, placeholder='', style, error, ...inputProps}) => {
    const [borderColor, setBorderColor] = useState('#D77944');
    const colors = {
        focused: '#974C20',
        original: '#D77944',
        error: 'red'
    }

    function onFocus(e) {
        setBorderColor(colors.focused);
    }
    function onBlur(e) {
        setBorderColor(colors.original)
    }

    useEffect(() => {
        if(error) {
            setBorderColor(colors.error);
        }
        else {
            setBorderColor(colors.original);
        }
    }, [error]);

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
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
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