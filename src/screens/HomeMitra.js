import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class HomeMitra extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home Mitra</Text>
            </View>
        )
    }
}

export default HomeMitra

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        flex: 1
    }
})