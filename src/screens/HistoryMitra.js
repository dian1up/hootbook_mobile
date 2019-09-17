import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class HistoryMitra extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>History Page</Text>
            </View>
        )
    }
}

export default HistoryMitra

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        flex: 1
    }
})