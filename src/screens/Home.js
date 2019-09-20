import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import DatePicker from 'react-native-datepicker'
import PopulerDestination from '../components/populerDest'
import Axios from 'axios'
import config from '../config/config'

const { width, height } = Dimensions.get('window')
class Home extends React.Component {
    constructor(props) {
        super(props)
        //set value in state for initial date
        this.state = {
            checkIn: new Date(),
            checkOut: new Date(),
            services: [],
            isLoading: false,
        }
    }
    componentDidMount = async () => {
        this.setState({
            isLoading: true
        })
        await Axios.get('https://api-hot-book.herokuapp.com/services')
            .then(result => {
                console.warn('data', result)
                this.setState({
                    services: result.data,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log(err)
            })


    }
    render() {
        const data = this.state.services
        return (
            <ScrollView style={styles.container}>
                <StatusBar translucent backgroundColor='#66a1e7' barStyle='light-content' />
                <View style={styles.wrapperbgImage}>

                    <Image
                        source={require('../assets/images/bg3.png')}
                        style={styles.bgImage}
                    />
                    <View style={styles.wrapperCardSearch}>
                        <View style={styles.cardSearch}>
                            <TextInput placeholder='Search Location in here'
                                style={styles.searching}
                            />
                            <Image
                                source={require('../assets/Icons/iconSearch.png')}
                                style={{
                                    position: 'absolute',
                                    top: 17,
                                    left: 10
                                }}
                            />
                            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                                <View style={{ flex: 1, }}>
                                    <Text>Check-In</Text>
                                    <DatePicker

                                        date={this.state.checkIn} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-2016"
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
                                                alignItems: 'baseline',
                                                paddingLeft: 7,
                                                borderWidth: 0
                                            }
                                        }}
                                        onDateChange={(checkIn) => { this.setState({ checkIn: checkIn }) }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text>Check-Out</Text>
                                    <DatePicker
                                        date={this.state.checkOut} //initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate="01-01-2016"
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
                                                alignItems: 'baseline',
                                                paddingLeft: 7,
                                                borderWidth: 0
                                            }
                                        }}
                                        onDateChange={(checkOut) => { this.setState({ checkOut: checkOut }) }}
                                    />

                                </View>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Explore') }} style={{ backgroundColor: '#66a1e7', borderRadius: 10, alignItems: 'center', paddingVertical: 12 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Search</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {/* populer destination */}
                <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 10, elevation: 3 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 10, color: '#636e72' }} >
                        Where Are you go Now
                    </Text>
                    {this.state.isLoading == true ?
                        <ActivityIndicator /> :
                        <PopulerDestination data={data} />}


                </View>
            </ScrollView >
        )
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapperbgImage: {
        height: height / 2.5,
    },
    bgImage: {
        width: '100%',
        height: '100%',
        position: 'relative'

    },
    wrapperCardSearch: {
        position: 'absolute',
        top: '10%',
        left: 0,
        zIndex: 1,
        height: '80%',
        width: '100%',
        padding: 10
    },
    cardSearch: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        elevation: 5,
        borderRadius: 15,
        paddingHorizontal: 10
    },
    searching: {
        paddingLeft: 35,
        borderBottomColor: '#b2bec3',
        borderBottomWidth: 1,
        position: 'relative'
    }
})