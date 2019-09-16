import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
} from 'react-native'

export default class Register extends Component {
    render() {
        return (
            <View style={styles.regform}>
                <Text style={styles.header}>Registration</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 24,
        color: "#fff",
        paddingBottom: 10,
        marginBottom: 40,
        borde
    }
})