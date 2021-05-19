import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator headerMode='none'>
      <AuthStack.Screen
          name="Sign In"
          component={SignIn}
          options={{ title: "Sign In" }}
      />
      <AuthStack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ title: "Sign Up" }}
      />
  </AuthStack.Navigator>
)

export default AuthNavigator;