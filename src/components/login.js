import React from 'react'
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native'

export default class LoginPage extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image
                        source={require('../assets/images/bg.jpg')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
        marginTop: 20
    }
})