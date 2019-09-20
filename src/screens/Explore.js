import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, TextInput, FlatList } from 'react-native'
import DatePicker from 'react-native-datepicker'
import ListExplore from '../components/listExplore'

const { width, height } = Dimensions.get('window')
class Explore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.navigation.getParam('searchData'),
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {/* header content */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            source={require('../assets/Icons/back.png')}
                        />
                    </TouchableOpacity>
                </View>
                {/* edit search */}
                <View style={{ backgroundColor: '#fff', alignItems: 'center', margin: 10, borderRadius: 10, elevation: 5 }}>
                    <TextInput
                        style={{
                            width: '100%', position: 'relative', paddingHorizontal: 30, elevation: 5, zIndex: 1
                        }}
                        defaultValue={this.state.city}
                        placeholder={this.state.city}
                        onChangeText={city => this.setState({city})}
                        />
                    <Image
                        style={{ position: 'absolute', top: 17, left: 10 }}
                        source={require('../assets/Icons/iconSearch.png')} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>checkIn</Text>
                            <DatePicker
                                date={this.state.checkIn} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate={new Date()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        alignItems: 'baseline',
                                        borderWidth: 0
                                    }
                                }}
                                onDateChange={(checkIn) => { this.setState({ checkIn: checkIn }) }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>checkOut</Text>
                            <DatePicker
                                date={this.state.checkOut} //initial date from state
                                mode="date" //The enum of date, datetime and time
                                placeholder="select date"
                                format="DD-MM-YYYY"
                                minDate={this.state.checkIn}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        right: 10,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        alignItems: 'baseline',
                                        borderWidth: 0
                                    }
                                }}
                                onDateChange={(checkOut) => { this.setState({ checkOut: checkOut }) }}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>this.setState({trigger:Number(this.state.trigger)+1})} style={{ backgroundColor: 'tomato', padding: 12, marginHorizontal: 10, borderRadius: 10 }}>
                    <Text style={{ fontSize: 16, color: '#fff' }}><Image style={{ transform: [{ rotate: '90deg' }] }} source={require('../assets/Icons/iconSearch.png')} />    Search</Text>
                </TouchableOpacity>
                <ListExplore key={this.state.trigger} {...this.state} />
            </View>
        )
    }
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
    header: {
        backgroundColor: '#66a1e7',
        height: 50,
        justifyContent: 'center',
        elevation: 5,
        paddingHorizontal: 20
    },
})