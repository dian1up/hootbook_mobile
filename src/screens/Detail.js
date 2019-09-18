import React from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')
class Detail extends React.Component {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#0fbcf9', height: 70, elevation: 5, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => { this.goBack }}>
                        <Text style={{ color: 'red' }}>Header</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: height / 3.5, backgroundColor: 'tomato' }}>
                </View>
                <View style={{ flexDirection: 'row', height: 80 }}>
                    <View style={{ flex: 2, backgroundColor: 'yellow' }}></View>
                    <View style={{ flex: 1, backgroundColor: 'blue' }}></View>
                </View>
                <ScrollView style={{ paddingVertical: 10, paddingHorizontal: 15, flex: 1 }}>
                    <Text style={{ backgroundColor: 'red', paddingVertical: 5, fontSize: 16, fontWeight: '700' }}>Nama Hotel</Text>
                    <Text style={{ fontSize: 20, backgroundColor: 'tomato', fontWeigh: 'bold' }}>Harga<Text style={{ fontSize: 12, fontWeight: 'normal', color: '#636e72' }}>/malam</Text></Text>
                    <Text style={{ color: '#636e72' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</Text>

                    <View style={{ backgroundColor: 'grey' }}>
                        <Text>Fasilitas</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={require('../assets/Icons/bathtub.png')}
                            />
                            <Image
                                source={require('../assets/Icons/television.png')}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'purple' }}>
                        <Text>Type: <Image
                            source={require('../assets/Icons/single-bed.png')}
                        /><Text> untuk 1 orang</Text></Text>

                    </View>
                    <View style={{ paddingBottom: 30 }}>
                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Description</Text>
                        <Text>Description It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. making it look like readable English</Text>
                    </View>

                </ScrollView>
                <View style={{ backgroundColor: 'blue', height: 50, flexDirection: "row", }}>
                    <View style={{ backgroundColor: 'yellow', flex: 2 }}>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: 'blue', flex: 1 }}>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

export default Detail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
    }
})