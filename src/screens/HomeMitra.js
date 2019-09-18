import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
// import { Image } from "native-base";
class HomeMitra extends React.Component {
    render() {
        return (
            // <View style={styles.container}>
                <Image style={{ height:200, width:200, resizeMode:'stretch'}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWMTKBph4g3sCBqyDlWa68iLUGdKjylvGp41d0PBnB4YGerToj'}} ></Image>
            // </View>
        )
    }
}

export default HomeMitra

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})