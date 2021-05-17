import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";  

const SearchBar = ({setSearching}) => {


    return (
        <TouchableOpacity style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                placeholder='Search for items'
                onFocus={() => setSearching(true)}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        color: '#565656'
    },
    searchContainer: {
        width: '100%',
        padding: 5,
        height: 35,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#D77944',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 25
    },
});
export default SearchBar;