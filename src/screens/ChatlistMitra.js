import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class ChatListMitra extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ChatList Mitra</Text>
            </View>
        )
    }
}

export default ChatListMitra

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        flex: 1
    }
})