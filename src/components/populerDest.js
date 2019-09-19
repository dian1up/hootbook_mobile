import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import Axios from 'axios'
import config from '../config/config'

class PopulerDestination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    render() {
        console.warn('pindah', this.props.data)
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {this.props.data.map((item, index) =>
                    <TouchableOpacity style={styles.wrapper} key={index} onPress={() => this.props.navigation.navigate('Detail', { item })}>
                        <View style={styles.wrapperImg}>
                            <Image
                                source={require('../assets/images/jakarta.jpg')}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.wrapperContent}>
                            <View style={styles.wrapperTop}>
                                <Text style={styles.HotelName}>{item.company}</Text>
                                <Text style={styles.address} >{item.address}</Text>
                            </View>
                            <View style={styles.wrapperBottom}>
                                <Text style={styles.prices}>{item.price} <Text style={{ color: '#636e72', fontWeight: 'normal', fontSize: 12 }}> /kamar/malam</Text></Text>
                                {/* <Text style={styles.status}>Available</Text> */}
                                {item.room_type === 1 ?
                                    <Text style={{ color: '#636e72' }}>type: <Text style={styles.roomType}>
                                        <Image source={require('../assets/Icons/single-bed.png')} />
                                        {item.room_type} orang/kamar</Text></Text> :
                                    <Text style={{ color: '#636e72' }}>type: <Text style={styles.roomType}>
                                        <Image source={require('../assets/Icons/single-bed.png')} />
                                        {item.room_type} orang/kamar</Text></Text>
                                }

                            </View>

                        </View>
                    </TouchableOpacity>
                )}


            </ScrollView >

        )
    }
}
export default withNavigation(PopulerDestination)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        height: 120,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#dfe6e9',
        borderRadius: 10,
        marginBottom: 10

    },
    wrapperImg: {
        width: '35%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    wrapperContent: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
    },
    HotelName: {
        fontSize: 15,
        color: '#2d3436',
        fontWeight: '700'
    },
    address: {
        color: '#636e72',
        marginBottom: 7
    },
    prices: {
        color: '#e17055',
        fontWeight: '700',
        fontSize: 16
    },
    roomType: {
        color: '#636e72',
        fontWeight: '700',

    },
    wrapperBottom: {
        borderTopWidth: 1,
        borderTopColor: '#dfe6e9',
        height: '40%',
        justifyContent: 'center'
    },
    wrapperTop: {
        height: '60%'
    }
})
