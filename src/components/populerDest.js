import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native'

class PopulerDestination extends React.Component {
    render() {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <Image
                        source={require('../assets/images/jakarta.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.darkContent}>
                        <Text style={styles.darkText}>Jakarta</Text>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <Image
                        source={require('../assets/images/bandung.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.darkContent}>
                        <Text style={styles.darkText}>Bandung</Text>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <Image
                        source={require('../assets/images/yogya.jpg')}
                        style={styles.image}
                    />
                    <View style={styles.darkContent}>
                        <Text style={styles.darkText}>Yogyakarta</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
export default PopulerDestination

const styles = StyleSheet.create({
    wrapper: {
        width: 220,
        height: 150,
        marginRight: 20,
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    darkContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(45, 52, 54,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    darkText: {
        color: '#fff',
        fontSize: 16
    }


})
