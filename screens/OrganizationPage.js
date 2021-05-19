 /*
    This page will display the main charity page that a user has selected
    Think of it as a charity profile page
    This is where the products that they desire are listed. Their mission statement and what they do, 
    along with possibly photos. 
*/

/*  
    This where most users will start, and select an item that they are looking to donate. It will then do a search of charities
    accepting donations for that kind of item. (maybe use craigslist list for categories or make your own).

    This is also the screen where if you haven't searched up any donations you can set up a charity account. (have some way to become a verified account (location would help))

    Search through (or search bar) a list of categories and select one. This will then generate the list of charities.
*/

import React, { useState, useEffect} from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Button, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../services/auth";
import { useNavigation } from '@react-navigation/native';
import SecureStorage from '../services/secureStorage';

import VendorPage from './VendorPage';
import DisplayButton from '../components/DisplayButton';

const OrganizationPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        SecureStorage.getValue('token').then(token => {
            if(token) setLoggedIn(true);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
      <View>
          {loggedIn ? <VendorPage /> : <OrganizationRegistration />}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: "100%",
        width: "100%",
        // margin: 'auto',
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
        //Box shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 8,  
        elevation: 5
      },
      section: {
        // textAlign: 'left',
        // justifyContent: 'flex-start',
        marginBottom: 20
      },
      displayButton: {
        backgroundColor: "#D77944",
        marginVertical: 5,
        // justifyContent: 'center',
        // textAlign: 'center',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 10,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "300",
        textAlign: "center",
    },
    link: {
        color: 'lightblue'
    }
});

const OrganizationRegistration = () => {
    let navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <View style={styles.section}><Text>Icon here</Text></View>
                <Text style={styles.section}>Does your charity need donations? Register your organization here so people can find you on Charitable.</Text>
                <Text style={{...styles.section}}>Already have an account? <Text style={styles.link} onPress={() => {
                        navigation.navigate('Auth', { screen: 'Sign In' });
                    }}>Sign In</Text> 
                </Text>
            </View>
            <View style={styles.section}>
                    
                <DisplayButton textStyle={styles.buttonText} buttonStyle={styles.displayButton} onPress={() => navigation.navigate('Sign Up')}>
                    <Text>Register Organization</Text>
                </DisplayButton>
                </View>
        </View>
    )   
}

export default OrganizationPage;