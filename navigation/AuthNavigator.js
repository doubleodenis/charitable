import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import BackButton from '../components/BackButton'

import AuthConsumer from '../contexts/AuthContext';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator
  screenOptions={{
    headerStyle: {
      borderBottomWidth: 0,
      shadowOpacity: 0
    }
  }}>

      <AuthStack.Screen
      name="Sign In"
      options={{
        headerTitle: null,
        headerLeft: () => <BackButton />,
      }}
      >
        {(props) => 
          <SignIn {...props} />
        }
        </AuthStack.Screen>
      <AuthStack.Screen
          name="Sign Up"
          component={SignUp}
          options={{
            headerTitle: null,
            headerLeft: () => <BackButton />,
          }}
      />
  
  </AuthStack.Navigator>
)

export default AuthNavigator;