import React from "react";
import { Image } from 'react-native'
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'native-base'
import Edit from '../screens/Edit'
import RegisterUser from '../screens/RegisterUser'
import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Maps from '../screens/Maps'
import Login from '../screens/login'
import RegisterMitra from '../screens/RegisterMitra'
import Detail from '../screens/Detail'
import Chat from '../screens/Chat'
import Explore from '../screens/Explore'
// screen mitra
import HomeMitra from '../screens/HomeMitra'
import ProfileMitra from '../screens/ProfileMitra'
import EditProfileMitra from '../screens/EditProfileMitra'
import HistoryMitra from '../screens/HistoryMitra'
import ChatListMitra from '../screens/ChatlistMitra'
import ChatListUser from '../screens/ChatlistUser'
import { styles } from "react-native-image-slider-box/SliderBox";



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
        ChatListUser: {
            screen: ChatListUser,
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
        Homeuser: UserTabNavigator,
        Homemitra: MitraTabNavigator,
        Detail,
        Edit,
        Chat,
        EditProfileMitra: {
            screen: EditProfileMitra,
            navigationOptions: {
                title: 'Edit Profile'
            }
        },
        Explore
    },
    {
        initialRouteName: 'Homeuser',
        headerMode: 'none',
    },
);

const AuthStack = createStackNavigator({
    Login,
    RegisterMitra,
    RegisterUser
},
    { headerMode: 'none' })

const Apps = createSwitchNavigator({
    AuthStack,
    AppStackNavigator,

}, {
    initialRouteName: 'AppStackNavigator',
})
const AppContainer = createAppContainer(Apps)
export default AppContainer