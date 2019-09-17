import React from 'react'
import { View, Text } from 'react-native'

class Chat extends React.Component {

    render() {
        const { name, badgeCount, color, size } = this.props
        return (
            <View>
                <Text>Inbox</Text>
            </View>
        )
    }
}

export default Chat