import { createStackNavigator } from "@react-navigation/stack";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
    <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>;
};

const DonateStack = createStackNavigator();

const DonateStackScreen = () => {
    <DonateStack.Navigator>
        <DonateStack.Screen name="Donate" component={Donate} />
    </DonateStack.Navigator>;
};

const NotificationsStack = createStackNavigator();

const NotificationsStack = () => {
    <NotificationsStack.Navigator>
        <NotificationsStack.Screen name="Notifications" component={Notifications} />
    </NotificationsStack.Navigator>;
};

const SettingsStack = createStackNavigator();

const SettingsStackScreen = () => {
    <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>;
};

return {
    HomeStackScreen,
    DonateStackScreen,
    SettingsStackScreen
}