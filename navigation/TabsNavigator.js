import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    SettingsStackScreen,
    MapStackScreen,
    DonatePlaceholder,
} from "./StackScreens";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tabs.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    backgroundColor: "#FFFBF8",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    position: "absolute",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -3 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 5,
                    height: 60 + insets.bottom,
                },
                activeTintColor: "#D77944",
                inactiveTintColor: "#9B9B9B",
            }}
        >
            <Tabs.Screen
                name="Map"
                component={MapStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="map"
                            style={{ fontSize: 30, color: color }}
                        />
                    ),
                }}
            />
            {/* Donate Button in middle, similar to a new post button */}
            <Tabs.Screen
                name="DonatePlaceHolder"
                component={DonatePlaceholder}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="search"
                            style={{ fontSize: 30, color: color }}
                        />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("Search");
                    },
                })}
            />

            <Tabs.Screen
                name="Settings"
                component={SettingsStackScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="cog"
                            style={{ fontSize: 30, color: color }}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default BottomTabNavigator;
