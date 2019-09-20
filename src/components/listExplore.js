import React from 'react'
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';
import Axios from 'axios';

class ListExplore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: props.services,
            checkIn: props.checkIn,
            checkOut: props.checkOut,
            city: props.city
        }
    }

    componentDidMount(){
        
        AsyncStorage.getItem('token',async (err, result)=>{
            if (err) {
                console.warn(err)
            } else {
                this.setState({token:result})
                console.log(result)
                let res = await Axios.get(config.host + '/booking/', {
                    headers:{
                        Authorization: result
                    }
                })
                .then(res => res)
                .catch(err => console.error(err))
                let bookings = res.data.data
                this.setState({bookingsData:bookings})
                let availableServices = this.state.data.filter(service => {
                    console.log(service)
                    let match = true
                    let city = service.address.split(',')[1]
                    if(city.toLowerCase() != this.state.city.toLowerCase()) return false
                    let serviceBookings = bookings.filter(bookingsData => bookingsData.service_id == service.id)
                    serviceBookings.forEach(booking =>{
                        
                        let check_out_arr = this.state.checkOut.split('-')
                        let check_in_arr = this.state.checkIn.split('-')
                        const checkOut  = new Date(check_out_arr[2], check_out_arr[1], check_out_arr[0])
                        const checkIn  = new Date(check_in_arr[2], check_in_arr[1], check_in_arr[0])
                        let checkedIn = new Date(booking.check_in)
                        let checkedOut = new Date(booking.check_out)

                        let bookedAfter = (checkedIn > checkIn && checkedIn > checkOut)
                        let bookedBefore = (checkedOut < checkOut && checkedOut < checkIn)

                        match = (bookedAfter || bookedBefore)
                        if(!match) {
                            console.log('nasdasd',this.state.checkIn, this.state.checkOut,checkedIn, checkedOut, bookedAfter,bookedBefore, match)
                            return false
                        }
                    })
                    return match
                })
                console.log('bookings',bookings)
                console.log('availableServices',availableServices)
                this.setState({data:availableServices})
            }
        })
    }

    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detail', {item, check_in: this.state.checkIn, check_out: this.state.checkOut})} style={{ height: 200, flex: 1, elevation: 3, borderRadius: 10, marginBottom: 20 }}>
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

                            </TouchableOpacity>
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
