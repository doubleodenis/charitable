import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsStackScreen, DonateStackScreen, MapStackScreen } from './StackScreens';

const Tabs = createBottomTabNavigator();

const BottomTabNavigator = () => (
        <Tabs.Navigator
            // screenOptions={({ route }) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         let iconName;
        
            //         if (route.name === 'Home') {
            //             iconName = focused
            //             ? 'ios-information-circle'
            //             : 'ios-information-circle-outline';
            //         } else if (route.name === 'Settings') {
            //             iconName = focused ? 'ios-list-box' : 'ios-list';
            //         }
        
            //         // You can return any component that you like here!
            //         return <Ionicons name={iconName} size={size} color={color} />;
            //     }
            // })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
        }}
        >
            {/* <Tabs.Screen
                name="Home"
                component={HomeStackScreen}
                options={{ title: "Home" }}
            /> */}
            <Tabs.Screen
                name="Map"
                component={MapStackScreen}
            />
            {/* Donate Button in middle, similar to a new post button */}
            <Tabs.Screen
                name="Donate"
                component={DonateStackScreen}
                options={{ 
                    title: "Donate", 
                    tabBarOptions: ({ focused, color, size }) => {
                        return (
                            <div style={{ borderRadius: size, backgroundColor: 'green', padding: 2 }}>
                                <Ionicons name={iconName} size={size} color={'white'} />
                            </div>
                        );
                    } 
                }}
            />

            {/* <Tabs.Screen
                name="Notifications"
                component={NotificationsStackScreen}
                options={{ title: "Notifications", tabBarBadge=3 }}
            /> */}
            <Tabs.Screen
                name="Settings"
                component={SettingsStackScreen}
                options={{ title: "Settings" }}
            />
        </Tabs.Navigator>
);

export default BottomTabNavigator;