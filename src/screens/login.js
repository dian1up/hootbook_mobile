import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native'

// import { Asset } from 'expo-asset'
// import { AppLoading } from 'expo';
// import LoginPage from '../components/login'

// function cacheImages() {
//     return cacheImages.map(image => {
//         if (typeof image === 'string') {
//             return image.prefetch(image)
//         } else {
//             return Asset.fromModule(image).downloadAsync()
//         }
//     })
// }

class Login extends React.Component {
    // constructor() {
    //     super()
    //     this.state = {
    //         isReady: false
    //     }
    // }

    // async _loadAssetsAsync() {
    //     const imageAssets = cacheImages([
    //         require('../assets/images/bg.jpg')
    //     ])
    //     await promises.all([...imageAssets])
    // }
    render() {
        // if (!this.state.isReady) {
        //     return (
        //         <AppLoading
        //             startAsync={this._loadAssetsAsync}
        //             onFinish={() => this.setState({ isReady: true })}
        //             onError={console.warn}
        //         />
        //     )
        // }
        return (
            <View>
                {/* <LoginPage /> */}
                <Text>Login</Text>
            </View>
        )
    }
}

export default Login
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
        marginTop: 20
    }
})