import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  <AuthStack.Navigator>
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
}

return AuthNavigator;