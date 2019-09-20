import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity,
    Image, 
    TextInput,
    Alert,
    Dimensions,
    StatusBar,
    StyleSheet,
    ScrollView,
    Modal,
    ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Axios from 'axios';
import config from '../config/config';

const { width, height } = Dimensions.get('window')

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            VisibleModal:false,
            markerCoordinate:{
                latitude:-7,
                longitude:110
            },
            mapRegion: null,
            kota:'',
            profinsi:'',
            alamat:'',
            name: '',
            email: '',
            company: '',
            password: '',
            address: '',
            maps: '',
            latitude:'',
            longitude:'',
            photo: '',
            data:[],   
            isLoading: false,
        }
    }

    showModal = (visible) => {
        this.setState({VisibleModal:visible})
    }

    handleSubmit = () => {
        const data ={
                name: this.state.name,
                email: this.state.email,
                company: this.state.company,
                password: this.state.password,
                address: this.state.profinsi+','+this.state.kota+','+this.state.alamat,
                latitude:this.state.latitude,
                longitude:this.state.longitude,
            }
        console.log(this.state.data)
        
        Axios.post(`${config.host}/register/partner`,data)
            .then(()=>{
                console.log('aosdil');
                
                this.props.navigation.navigate('Login')
            })
            .catch(err => Alert.alert(err))
    }
    
    render() {
        let { latitude,longitude} = this.state
        latitude=String(latitude)
        longitude=String(longitude)
        return(
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='#87baf3' barStyle='light-content' />
                <Image
                    source={require('../assets/images/bg4.png')}
                    style={{ marginBottom: 20, height: "40%", }}
                />
                <ScrollView>
                    <TextInput style={styles.input}
                        placeholder="Name"
                        selectionColor="#fff"
                        maxLength={64}
                        onChangeText={(e)=>this.setState({name:e})}/>
                    <TextInput style={styles.input}
                        placeholder="Email"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        maxLength={64}
                        onChangeText={(e)=>this.setState({email:e})}/>
                    <TextInput style={styles.input}
                        placeholder="Company"
                        selectionColor="#fff"
                        maxLength={13}
                        onChangeText={(e)=>this.setState({company:e})}/>
                    <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Province"
                        selectionColor="#fff"
                        onChangeText={(e)=>this.setState({profinsi:e})}/>
                    <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="City"
                        selectionColor="#fff"
                        onChangeText={(e)=>this.setState({kota:e})}/>
                    <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Address"
                        selectionColor="#fff"
                        onChangeText={(e)=>this.setState({alamat:e})}/>
                    <TextInput style={styles.input}
                        placeholder="Password"
                        selectionColor="#fff"
                        secureTextEntry={true}
                        maxLength={32}
                        onChangeText={(e)=>this.setState({password:e})}/>

                    {this.state.latitude.length!==0 && this.state.longitude.length!==0 
                    ?
                    <View>
                    <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={latitude}
                        selectionColor="#fff"
                        editable={false}
                        />
                   <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={longitude}
                        selectionColor="#fff"
                        editable={false}
                        />
                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#66a1e7', 
                            borderRadius: 25, 
                            alignItems: 'center',
                            width: width / 1.5, 
                            marginTop:10,
                            paddingVertical: 15, elevation: 3 }}
                            disabled={this.state.isLoading}
                            onPress={()=>this.handleSubmit()}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>REGISTER</Text>
                    </TouchableOpacity>
                    </View>
                    :
                    <View>
                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#66a1e7', 
                            borderRadius: 25, 
                            alignItems: 'center',
                            width: width / 1.5, 
                            marginTop:10,
                            paddingVertical: 15, elevation: 3 }}
                            disabled={this.state.isLoading}
                            onPress={()=>this.showModal(true)}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Pick Your Location</Text>
                    </TouchableOpacity>
                    </View>

                    }
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', }}>
                        <View>
                            <Text style={{ color: 'grey' }}>Already have an Account?</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ color: '#295989', fontWeight: '700' }}>Sign In</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </ScrollView>

{/* ------------------------------------------------------maps modal---------------------------------------------- */}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.VisibleModal}
                    >
                        
                        <TouchableOpacity 
                        style={{ 
                            zIndex:1,
                            position:'absolute',
                            bottom:'10%',
                            left:'25%',
                            borderRadius: 25, 
                            alignItems: 'center',
                            width:50,
                            height:50,}}
                            onPress={()=>{
                                this.setState({
                                    latitude:'',
                                    longitude:'',
                                })
                                this.showModal(false)
                            }}
                        >
                            <Image source={require('../assets/images/remove.png')} style={{resizeMode:'stretch',width:25,height:25}} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                        style={{
                            zIndex:1,
                            bottom:'10%',
                            right:'25%', 
                            position:'absolute',
                            borderRadius: 25, 
                            alignItems: 'center',
                            width:50,
                            height:50,}}
                            onPress={()=>this.showModal(false)}
                        >
                            <Image source={require('../assets/images/correct.png')} style={{resizeMode:'stretch',width:30,height:30}} />
                        </TouchableOpacity>

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
                                onRegionChange={(region)=>{
                                    this.setState({
                                        markerCoordinate:region,
                                        latitude:region.latitude,
                                        longitude:region.longitude,
                                    })
                                    
                                }}
                            >

                                <Marker 
                                    coordinate={this.state.markerCoordinate}
                                />
                            </MapView>
                    </View>
                    </Modal>
{/* ==================================LOADING========================================================================== */}
                <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.isLoading}
                    >
                        <View style={{backgroundColor:'#f9f9f9', flex:1, opacity:0.7,alignItems:'center',justifyContent:'center'}}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                        
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'flex-end'
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        width: width / 1.5,
        marginBottom: 10,
        borderRadius: 25,
        paddingLeft: 20
    },
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
