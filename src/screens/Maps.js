import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Maps extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Maps</Text>
            </View>
        )
    }
}

export default Maps
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'tomato',
        flex: 1
    }
})