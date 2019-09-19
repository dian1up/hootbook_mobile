import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, Picker } from 'react-native'
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';
import Jwt from "react-native-pure-jwt";

const { width, height } = Dimensions.get('window')
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formData : {
                email:'',
                password:''
            },
            loginAs:'',
            isLoading:false,
        }
    }

    handleChange = (name, text) => {
        
        let formData = this.state.formData
        formData[name] = text
        this.setState({formData})
}
    decodeJwt = (inputJwt) => {
        return Jwt.decode(
            inputJwt, // the token
            config.secret, // the secret
            {
              skipValidation: true // to skip signature and exp verification
            }
          )
          .then(res => res) // already an object. read below, exp key note
          .catch(console.error);
    }


    componentDidMount=  ()=>{
        AsyncStorage.getItem('token',async (err, result)=>{
            if (!err) {
                let decode = await this.decodeJwt(result.split(' ')[1])
                console.warn('data = ', decode)
                console.warn('jwt = ', result.split(' ')[1])
                let home = decode.payload.level === 'user' ? 'Homeuser' : 'Homemitra'
                this.props.navigation.navigate(home)
            } else {
                console.warn(err)
            }
        })
    }

    handleSubmit = () => {
        if(this.state.loginAs !== ''){
            this.setState({isLoading:true})
            Axios.post(`${config.host}/login/${this.state.loginAs}`, this.state.formData)
                .then(result => {
                    console.log('done', result)
                    AsyncStorage.setItem('token', result.data.token, (err)=>{
                        if(!err){
                            const home = this.state.loginAs === 'partner' ? 'Homemitra' : 'Homeuser'
                            console.log(home);
                            
                            this.props.navigation.navigate(home)
                        }
                        else console.log(err)
                        this.setState({isLoading:false})
                    })
                })
                .catch(err => {
                    this.setState({isLoading:false})
                    console.log(err, `${config.host}/login/${this.state.loginAs}`, this.state.formData)
                    alert(err)
                })
        }else{
            console.warn('login as empty')
        }
}

    render() {
        
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='#87baf3' barStyle='light-content' />
                <Image
                    source={require('../assets/images/bg4.png')}
                    style={{ marginBottom: 20, }}
                />
                <View style={{  backgroundColor: '#fff', marginBottom:50}}>
                    <TextInput
                        placeholder='emailawdawdaw'
                        keyboardType='email-address'
                        style={styles.input}
                        onChangeText={(text => this.handleChange('email', text))}
                    />
                    <TextInput
                        placeholder='password'
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={(text => this.handleChange('password', text))}
                    />
                    <Picker
                        selectedValue={this.state.loginAs}
                        style={styles.input}
                        onValueChange={(itemValue, itemIndex) =>{
                            console.log(itemValue);
                            
                            this.setState({loginAs: itemValue}, ()=>console.log(this.state))
                        }
                        }>
                        <Picker.Item label="Login as" value="" />
                        <Picker.Item label="User" value="user" />
                        <Picker.Item label="Partner" value="partner" />
                    </Picker>
                    <TouchableOpacity 
                        style={{ backgroundColor: '#66a1e7', 
                        borderRadius: 25, alignItems: 'center', 
                        
                        paddingVertical: 15, elevation: 3 }}
                        disabled={this.state.isLoading}
                        onPress={this.handleSubmit}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>{this.state.isLoading ? 'Loading':'Sign In'}</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', }}>
                        <View>
                            <Text style={{ color: 'grey' }}>Dont have an Account?</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={{zIndex:1}} onPress={() => this.props.navigation.navigate('RegisterUser')}>
                                <Text style={{ color: '#295989', fontWeight: '700' }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login
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
    }
})