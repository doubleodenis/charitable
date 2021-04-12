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

  
const VendorPage = () => {
    const [orgName, setOrgName] = useState('Organization Name');
    const [description, setDesc] = useState('This is an example description.');

    function donate(e) {
        //...
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
                style={styles.vendorImage}
                source={null}
            />
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.orgHeader}>{orgName}</Text>
            <Text style={styles.orgDescription} numberOfLines={5}>{description}</Text>
            {/* Have a list of requested items that can be selected (or multi select), when selected a button bar shows up on bottom that says DONATE */}

        </View>
        
        <Button title="Donate" color="#FA740D" style={styles.donateButton} onPress={donate}/>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
      },
      contentContainer: {
        margin: '3%'
      },
      title: {
        fontSize: 32,
      },
      imageContainer: {
          width: '100%',
          height: 150,
          backgroundColor: "#FA740D"
      },
      vendorImage: {
          width: '100%'
      },
      orgHeader: {
          fontSize: 24
      },
      orgDescription: {
          fontSize: 16
      },
      donateButton: {
      }
  });

export default VendorPage;