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
} from 'react-native';
import MapView from 'react-native-maps';
import Maps from './Maps'


const { width, height } = Dimensions.get('window')

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData: {
                    facilities: '',
                    room_type: '',
                    price: '',
                    photo: ''   
                    },
            isLoading: false,
        }
    }

    submit = () => {
        Alert.alert('ADD SERVICESS');
    }

    changerValue = field => value => { this.setState({[field]:value})}

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='#87baf3' barStyle='light-content' />
                <Image
                    source={require('../assets/images/bg4.png')}
                    style={{ marginBottom: 20, height: "40%", }}
                />
                <ScrollView>
                    <TextInput style={styles.input}
                        placeholder="Facilities"
                        selectionColor="#fff"
                        maxLength={64}
                        onChangeText={this.changerValue('facilities')}
                        onSubmitEditing={()=> this.formData.room_type.focus()}/>
                    <TextInput style={styles.input}
                        placeholder="Room Type"
                        selectionColor="#fff"
                        maxLength={64}
                        onChangeText={this.changerValue('room_type')}
                        onSubmitEditing={()=> this.formData.room_type.focus()}/>
                    <TextInput style={styles.input}
                        placeholder="Price"
                        selectionColor="#fff"
                        maxLength={13}
                        onChangeText={this.changerValue('price')}
                        onSubmitEditing={()=> this.formData.photo.focus()}/>
                    <TextInput style={styles.input}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Image"
                        selectionColor="#fff"
                        onChangeText={this.changerValue('image')}/>

                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#66a1e7', 
                            borderRadius: 25, 
                            alignItems: 'center',
                            width: width / 1.5, 
                        
                            paddingVertical: 15, elevation: 3 }}
                            disabled={this.state.isLoading}
                            onPress={this.submit}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#66a1e7', 
                            borderRadius: 25, 
                            alignItems: 'center',
                            width: width / 1.5, 
                            marginTop:10,
                            paddingVertical: 15, elevation: 3 }}
                            disabled={this.state.isLoading}
                            onPress={()=>this.props.navigation.navigate('HomeMitra')}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                    </ScrollView>
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
    maps: {
        height: 130,
        paddingBottom: 10,
        borderRadius: 25,
    }
})
