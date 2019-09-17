import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Profile extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile user</Text>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        flex: 1
    }
})