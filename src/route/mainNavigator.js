import React from "react";
import { Image } from 'react-native'
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'native-base'

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Maps from '../screens/Maps'
import Login from '../screens/login'
import Register from '../screens/Register'
import Detail from '../screens/Detail'
import Chat from '../screens/Chat'
// screen mitra
import HomeMitra from '../screens/HomeMitra'
import ProfileMitra from '../screens/ProfileMitra'
import HistoryMitra from '../screens/HistoryMitra'
import ChatListMitra from '../screens/ChatlistMitra'



const UserTabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/home-icon.png')}
                    />

                ),
            },
        },
        Maps: {
            screen: Maps,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/map.png')}
                    />
                ),
            },
        },
        Chat: {
            screen: Chat,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/chat.png')}
                    />
                ),
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/user.png')}
                    />

                ),
            },
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#0fbcf9',
            inactiveTintColor: 'grey',
            upperCaseLabel: false,
            labelStyle: {
                fontSize: 10,
                margin: 0,
                fontWeight: '700'
            },
            style: {
                backgroundColor: '#fff',
                elevation: 15,
                height: 55,
                paddingVertical: 0,
            },
            indicatorStyle: {
                height: 0,
            },
            showIcon: true,
        },
    },
);

const MitraTabNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: HomeMitra,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/home-icon.png')}
                    />

                ),
            },
        },
        History: {
            screen: HistoryMitra,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/history.png')}
                    />
                ),
            },
        },
        Inbox: {
            screen: ChatListMitra,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/chat.png')}
                    />
                ),
            },
        },
        Profile: {
            screen: ProfileMitra,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Image
                        source={require('../assets/Icons/user.png')}
                    />

                ),
            },
        },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#0fbcf9',
            inactiveTintColor: 'grey',
            upperCaseLabel: false,
            labelStyle: {
                fontSize: 10,
                margin: 0,
                fontWeight: '700'
            },
            style: {
                backgroundColor: '#fff',
                elevation: 15,
                height: 55,
                paddingVertical: 0,
            },
            indicatorStyle: {
                height: 0,
            },
            showIcon: true,
        },
    },
);


const AppStackNavigator = createStackNavigator(
    {
        Home: UserTabNavigator,
        Homemitra: MitraTabNavigator,
        Detail

    },
    {
        headerMode: 'none',
    },
);

const AuthStack = createStackNavigator({
    Login,
    Register,
},
    { headerMode: 'none' })

const Apps = createSwitchNavigator({
    AuthStack,
    AppStackNavigator,

}, {
    initialRouteName: 'AuthStack',
})
const AppContainer = createAppContainer(Apps)
export default AppContainer