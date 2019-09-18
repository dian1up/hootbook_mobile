import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import DatePicker from 'react-native-datepicker'
import PopulerDestination from '../components/populerDest'

const { width, height } = Dimensions.get('window')
class Home extends React.Component {
    constructor(props) {
        super(props)
        //set value in state for initial date
        this.state = { date: "15-05-2018" }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapperbgImage}>
                    <Image
                        source={require('../assets/images/bg3.png')}
                        style={styles.bgImage}
                    />
                    <View style={styles.wrapperCardSearch}>
                        <View style={styles.cardSearch}>
                            <TextInput placeholder='Location'
                                style={styles.searching}
                            />
                            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                <View style={{ flex: 1, }}>
                                    <DatePicker

                                        date={this.state.date} //initial date from state
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
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 33
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <DatePicker
                                        date={this.state.date} //initial date from state
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
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: {
                                                marginLeft: 33
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />

                                </View>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Explore') }} style={{ backgroundColor: '#0fbcf9', borderRadius: 25, alignItems: 'center', paddingVertical: 12 }}>
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Search</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                {/* populer destination */}
                <View style={{ flex: 1, marginTop: 80, paddingHorizontal: 20 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 10, color: '#636e72' }} >
                        Where Are you go Now
                    </Text>
                    <PopulerDestination />

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
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        position: 'relative'

    },
    wrapperCardSearch: {
        position: 'absolute',
        top: '35%',
        left: 0,
        zIndex: 1,
        height: '100%',
        width: '100%',
        padding: 20
    },
    cardSearch: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        opacity: 0.8,
        elevation: 5,
        borderRadius: 15,
        padding: 10
    },
    searching: {
        borderWidth: 1,
        borderColor: '#0fbcf9',
        borderRadius: 25,
        paddingLeft: 20
    }
})