import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import Axios from 'axios'
import config from '../config/config'

class ListExplore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            data: [
                {
                    id: 1,
                    company: 'Jw Marriot Hotel',
                    address: 'jln apa aja mungkin yah begitu lah bingung aku tuh',
                    room_type: 1,
                    price: 300000
                },
                {
                    id: 2,
                    company: 'Jw Marriot Hotel',
                    address: 'jln apa aja mungkin yah begitu lah bingung aku tuh',
                    room_type: 1,
                    price: 300000
                },
                {
                    id: 3,
                    company: 'Jw Marriot Hotel',
                    address: 'jln apa aja mungkin yah begitu lah bingung aku tuh',
                    room_type: 1,
                    price: 300000
                },
                {
                    id: 4,
                    company: 'Jw Marriot Hotel',
                    address: 'jln apa aja mungkin yah begitu lah bingung aku tuh',
                    room_type: 1,
                    price: 300000
                },
            ]
        }
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ height: 200, flex: 1, elevation: 3, borderRadius: 10, marginBottom: 20 }}>
                                <Image source={require('../assets/images/bandung.jpg')} style={{ height: '45%', borderTopLeftRadius: 10, borderTopRightRadius: 10, width: '100%' }} />
                                <View style={{ paddingHorizontal: 5 }}>
                                    <Text style={{ fontSize: 18, color: 'tomato' }}>{item.company}</Text>
                                    <Text style={{ color: 'grey', }}>{item.address}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 5, borderTopWidth: 1, borderColor: '#b2bec3', flex: 1 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: '#b2bec3' }}>Room type</Text>
                                        {item.room_type == 1 ?
                                            <Text style={{ color: '#b2bec3' }}><Image source={require('../assets/Icons/single-bed.png')} />1 orang / kamar</Text> :
                                            <Text style={{ color: '#b2bec3' }}><Image source={require('../assets/Icons/single-bed.png')} />2 orang / kamar</Text>}

                                    </View>
                                    <View style={{ justifyContent: 'space-around', flex: 1 }}>
                                        <Text style={{ color: 'tomato', fontSize: 16, fontWeight: '700' }}>{item.price} <Text style={{ fontSize: 13, color: '#b2bec3' }}>/kamar/malam</Text></Text>
                                    </View>
                                </View>

                            </View>
                        )
                    }}
                />




            </ScrollView >

        )
    }
}
export default withNavigation(ListExplore)

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
