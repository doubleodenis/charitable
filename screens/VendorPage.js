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

import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, Button, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import Tag from '../components/Tag';
import SampleIcon from "../components/icons/SampleIcon";

const VendorPage = () => {
    const [orgName, setOrgName] = useState('West Charity');
    const [description, setDesc] = useState('A charity for people with big dreams and no toys.');
    const [locations, setLocations] = useState(['12345 Merigold Lane, Miami, FL 44556']);
    
    const [missionTags, setMissionTags] = useState(['Women', 'Kids']);
    const [itemsNeeded, setItemsNeeded] = useState(['Clothes', 'Food', 'Toys']);
    const [contactInfo, setContactInfo] = useState({
        email: 'wcharity@gmail.com',
        phone: '(305)-752-453',
        website: 'https://wcharity.com'
    });

    function donate(e) {
        //...
    } 

    function displayLocations() {
        return locations.map((l, idx) => (
            <Text key={idx} style={styles.description}>{l}</Text>
        ))
    }

    function displayTags(list) {
        return list.map((item, idx) => (
            <Tag key={idx}>{item}</Tag>
        ))
    }

    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', margin: 0, padding: 20 }}>
          <View style={styles.container}>
              
            <View style={styles.imageContainer}>
                <SampleIcon />
            </View>
            
            <View style={styles.contentContainer}>
                <Text style={styles.orgHeader}>{orgName}</Text>
                
                <View nativeID="locations-section" style={styles.section}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sectionHeader}>Locations</Text>
                    </View>
                    <View style={{ width: '75%', flexWrap: 'wrap', flexDirection: 'row' }}>
                        {locations.length > 0 ? displayLocations() : <Text>None</Text>}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Who We Are</Text>
                    <Text style={styles.description} numberOfLines={5}>{description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Mission Tags</Text>
                    <View style={{ flexDirection: 'row' }}>{displayTags(missionTags)}</View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>What We Need</Text>
                    <View style={{ flexDirection: 'row'}}>{displayTags(itemsNeeded)}</View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>How To Reach Us</Text>
                    <View>
                        <Text style={styles.description}>
                            Email: {contactInfo.email}{'\n'}
                            Phone: {contactInfo.phone}{'\n'}                
                            Website: {contactInfo.website}
                        </Text>
                    </View>
                </View>
            </View>
    
        </View>
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
        textAlign: 'left',
        justifyContent: 'flex-start',
        marginBottom: 20
      },
      contentContainer: {
        // margin: '3%'
      },
      title: {
        fontSize: 32,
      },
      imageContainer: {
          width: '100%',
          marginVertical: 10
        //   height: 150,
      },
      orgImage: {
        resizeMode: 'cover',
      },
      orgHeader: {
          fontSize: 32,
          textAlign: 'center',
          color: "#8BC178",
          marginBottom: 10
      },
      sectionHeader: {
        fontSize: 18,
        marginBottom: 5
      },
      textButton: {
        color: "#8BC178",
        fontSize: 14
      },
      description: {
          fontSize: 16,
          color: "#706052",
          lineHeight: 20
      },
  });

export default VendorPage;