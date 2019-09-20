import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native'

import { SliderBox } from 'react-native-image-slider-box'
import MapView, { Marker } from 'react-native-maps'
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';
import Axios from 'axios';
import JsonWebToken from "react-native-pure-jwt";

const { width, height } = Dimensions.get('window')
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.navigation.getParam('item'),
            check_in:this.props.navigation.getParam('check_in'),
            check_out:this.props.navigation.getParam('check_out'),
            images: [
                'https://source.unsplash.com/1024x768/?nature',
                'https://source.unsplash.com/1024x768/?water',
                'https://source.unsplash.com/1024x768/?girl',
                'https://source.unsplash.com/1024x768/?tree'
            ],
            region: {
                latitude: -7.797068,
                longitude: 110.370529,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            },
            currentUserData:{},
        };
    }
    decodeJwt = (inputJwt) => {
      return JsonWebToken.decode(
          inputJwt, 
          config.secret, 
          {
            skipValidation: true 
          }
        )
        .then(res => res) 
        .catch(console.error);
    }

    componentDidMount(){
      AsyncStorage.getItem('token',async (err, result)=>{
        if (!err) {
            this.setState({token:result})
            console.log('asdasdad'+result.split(' ')[1])
            let decode = await this.decodeJwt(result.split(' ')[1])
            console.log('data = ', decode.payload)
            this.setState({currentUserData:decode.payload})
  
        } else {
            console.warn(err)
        }
      })
    }
    onPressBooking = () => { 
        const { data,check_in,check_out, token } = this.state
        if(check_out){

            let check_out_arr = check_out.split('-')
            let check_in_arr = check_in.split('-')
            const checkOut  = new Date(check_out_arr[2], check_out_arr[1], check_out_arr[0])
            const checkIn  = new Date(check_in_arr[2], check_in_arr[1], check_in_arr[0])

            Axios.get(config.host + '/booking/' + data.hotel_id, {
                headers:{
                    Authorization: token
                }
            })
            .then(result => {
                console.log('daasdad',result, result.data)
                let bookings = result.data.data.filter(bookingsData => bookingsData.service_id == data.id)
                let available = true
                bookings.forEach(booking =>{
                    checkedIn = new Date(booking.check_in)
                    checkedOut = new Date(booking.check_out)
                    let bookedAfter = (checkedIn > checkIn && checkedIn > checkOut)
                    let bookedBefore = (checkedOut < checkOut && checkedOut < checkIn)
                    available = (bookedAfter || bookedBefore)
                })
                if(available){
                    const bookingData = {
                        service_id: data.id,
                        price: data.price,
                        check_in:checkIn,
                        check_out:checkOut
                    }
                    console.log(bookingData)
                    Axios.post(`${config.host}/booking`, bookingData, {
                        headers:{
                            Authorization: token
                        }
                    })
                    .then(res => {
                        console.log(res)
                        this.xendisInvois(res.data.data.totalPayment, this.state.currentUserData.email)
                        alert('Success')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }else {
                    alert('Room not available')
                }
                console.log(available)
            })
            .catch(err => console.error(err))
            
        }else{
            alert('Please select checkout date')
        }

    }
    onPressMessage = () => {
        const { data, currentUserData } = this.state
        const hotel = {
            _id: data.email,
            name: data.company,
            avatar: data.image || 'https://placeimg.com/140/140/any',
        }
        const user = {
            _id: currentUserData.email,
            name: currentUserData.name,
            avatar: data.image || 'https://placeimg.com/140/140/any',
        }
        this.props.navigation.navigate('Chat', {hotel,user,currentUser:'user'})
    }
    goBack = () => {
        this.props.navigation.goBack()
    }

    xendisInvois=async(amount, userEmail)=>{
        let data ={
            "external_id": "invoice-{{$timestamp}}",
            "amount": amount,
            "payer_email": userEmail,
            "description": "Booking Hotel Room"
        }
        await Axios.post('https://api.xendit.co/v2/invoices',data,{
            auth:{
                username:'xnd_development_GjFmOYU7tUUZjTkhn7WYFmAlxEtKEO14gFdFhPIsqhTIfj62UjrsujJVXqioRhn'
            }
        })
        .then(res=>{
            let data={
                id_transaction:res.data.id,
                data:res.data,
                status:res.data.status
            }
            Axios.post('https://api-hot-book.herokuapp.com/payment/create',data,)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log('hai',err))
    }

    render() {
        const { data } = this.state
        console.warn('data', data)
        return (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: '#66a1e7', height: 50, elevation: 5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginTop:
                        20
                }}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require('../assets/Icons/back.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: height / 3.5 }}>
                    <SliderBox images={this.state.images} />
                </View>
                <View style={{ flexDirection: 'row', height: 70, elevation: 1 }}>
                    <View style={{ flex: 1, padding: 5 }}>
                        <MapView
                            style={{ width: '100%', height: '100%', }}
                            region={this.state.region}
                            showsUserLocation={false}
                            followUserLocation={true}
                            zoomControlEnabled={false}
                            showsCompass={false}
                            minZoomLevel={0}
                            maxZoomLevel={20}
                        >
                            <Marker
                                coordinate={{
                                    latitude: Number(data.latitude),
                                    longitude: Number(data.longitude)
                                }
                                }>
                                <View>
                                    <Image source={require('../assets/Icons/marker1.png')} />
                                </View>
                            </Marker>
                        </MapView>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <DatePicker
                            style={{ width: '50%', justifyContent: 'flex-start' }}
                            mode="date" //The enum of date, datetime and time
                            placeholder="Check in"
                            date={this.state.check_in}
                            format="DD-MM-YYYY"
                            minDate={new Date()}
                            // maxDate="01-01-2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    // marginLeft: 33
                                    borderWidth: 0,
                                    alignItems: 'baseline',
                                    paddingLeft: 7
                                }
                            }}
                            onDateChange={(date) => { this.setState({ check_in: date }) }}
                        />
                        <DatePicker
                            style={{ width: '50%' }}
                            date={this.state.check_out} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="Check out"
                            format="DD-MM-YYYY"
                            minDate={new Date()}
                            // maxDate="01-01-2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: 0,
                                    top: 4,
                                },
                                dateInput: {
                                    borderWidth: 0,
                                    alignItems: 'baseline',
                                    paddingLeft: 7
                                }
                            }}
                            onDateChange={(date) => { this.setState({ check_out: date }) }}
                        />
                    </View>

                </View>
                <ScrollView style={{ paddingTop: 0, paddingBottom: 5, paddingHorizontal: 15, flex: 1, }}>
                    <Text style={{ paddingVertical: 5, fontSize: 16, fontWeight: '700', color: '#2d3436' }}>{data.company}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'tomato' }}>{data.price}<Text style={{ fontSize: 12, fontWeight: 'normal', color: '#636e72' }}>/malam</Text></Text>
                    <Text style={{ color: '#636e72' }}>{data.address}</Text>

                    <View style={{ paddingTop: 1, borderTopWidth: 1, borderTopColor: '#dfe6e9', marginTop: 5 }}>
                        <Text>Fasilitas</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.imageFasilitas}
                                source={require('../assets/Icons/bathtub.png')}
                            />
                            <Image
                                style={styles.imageFasilitas}
                                source={require('../assets/Icons/television.png')}
                            />

                            <Image
                                style={styles.imageFasilitas}
                                source={require('../assets/Icons/wifi.png')}
                            />
                        </View>
                    </View>
                    <View style={{ marginBottom: 5, borderBottomColor: '#dfe6e9', borderBottomWidth: 1, paddingBottom: 5 }}>
                        {data.room_type === 1 ? (<Text>Type kamar: <Image
                            source={require('../assets/Icons/single-bed.png')}
                        /><Text> 1 orang/kamar</Text></Text>) :
                            (<Text>Type: <Image
                                source={require('../assets/Icons/single-bed.png')}
                            /><Text> 2 orang/kamar</Text></Text>)}
                    </View>
                    <View style={{ paddingBottom: 30 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Description</Text>
                        <Text>{data.description}</Text>
                    </View>

                </ScrollView>
                <View style={{ height: 50, flexDirection: "row", }}>
                    <View style={{ backgroundColor: '#295989', flex: 2 }}>
                        <TouchableOpacity onPress={this.onPressBooking} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Booking Now</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.onPressMessage} style={{ backgroundColor: '#66a1e7', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageFasilitas: {
        marginHorizontal: 5
    }
})