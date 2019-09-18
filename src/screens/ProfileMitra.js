import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class ProfileMitra extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile Mitra</Text>
            </View>
        )
    }
}

export default ProfileMitra

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        flex: 1
    }
})