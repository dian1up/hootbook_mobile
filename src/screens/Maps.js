import React from 'react'
import { View, Text, StyleSheet, Dimensions, StatusBar, Image, TouchableOpacity, Modal } from 'react-native'
import geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
// import { withNavigation } from 'react-navigation';


const { width, height } = Dimensions.get("window")
class Maps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            hotel: [
                {
                    id: 1,
                    name: 'homestay apalah',
                    lat: -7.797068,
                    long: 110.370529,
                    price: 200000
                },
                {
                    id: 2,
                    name: 'homestay fuad',
                    lat: -7.796068,
                    long: 110.370529,
                    price: "300000"
                }
            ]
        }
    }

    componentDidMount = async () => {
        this.watchID = geolocation.getCurrentPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922 * 1.5,
                longitudeDelta: 0.00421 * 1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
        }, (error) => console.log(error));
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    render() {
        return (
            <View style={styles.con}>
                <StatusBar translucent backgroundColor='#87baf3' barStyle='light-content' />
                <MapView
                    style={styles.map}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followUserLocation={true}
                    zoomControlEnabled={true}
                    showsCompass={true}
                    minZoomLevel={0}
                    maxZoomLevel={20}

                >
                    {this.state.hotel.map((item, index) =>

                        <Marker
                            key={index}
                            // title={item.price}
                            // description={item.price}
                            onPress={() => { this.props.navigation.navigate('Detail') }}
                            coordinate={{
                                latitude: item.lat || 0,
                                longitude: item.long || 0
                            }}>
                            <Text style={{ backgroundColor: '#87baf3', color: '#fff', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, position: 'relative' }}>{item.name}</Text>
                            <View style={{ position: "absolute", bottom: -10, left: 0, height: '20%', width: '100%', justifyContent: 'center', backgroundColor: 'red' }}>
                                <Text> A </Text>
                            </View>

                            {/* <Image source={require('../assets/images/bg.jpg')} style={{ width: 50, height: 50 }} /> */}

                        </Marker>
                    )}

                </MapView>
            </View>
        );
    }
}
export default Maps;
const styles = StyleSheet.create({
    con: {
        flex: 1,
        height: height
    },
    map: {
        width: '100%',
        height: '100%'
    },
    mapCoor: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#2ed573',
        borderRadius: 50,
        justifyContent: 'center'
    },
    mapCoorOffline: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'tomato',
        borderRadius: 50,
        justifyContent: 'center'
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 50,
    },
    name: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: '2%'
    }
})