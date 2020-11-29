import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import Root from './navigation/RootNavigator';
import SignIn from './screens/SignIn';

export default App = () => {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="SignIn" component={SignIn} />
      </Root.Navigator>
    </NavigationContainer>
  )
}


