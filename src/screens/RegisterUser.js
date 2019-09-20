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
    Modal,
    ActivityIndicator,
} from 'react-native';
import Axios from 'axios';
import config from '../config/config';
const { width, height } = Dimensions.get('window')

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',  
            isLoading: false,
        }
    }

    submit = () => {
        Alert.alert('SIGN UP', this.state.formData.name);
    }

    handleSubmit = () => {  
        this.setState({isLoading:true})
        let data = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
        }
        Axios.post(`${config.host}/register/user`,data)
            .then(()=>{
                console.log('aosdil');
                this.setState({isLoading:false})
                this.props.navigation.navigate('Login')
            })
            .catch(err =>{ 
                this.setState({isLoading:false})
                Alert.alert(err)})
    }

    render() {
        return(
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='#87baf3' barStyle='light-content' />
                <Image
                    source={require('../assets/images/bg4.png')}
                    style={{ marginBottom: 20, }}
                />
                    <TextInput style={styles.input}
                        placeholder="Name"
                        selectionColor="#fff"
                        maxLength={64}
                        onChangeText={(e)=>this.setState({name:e})}
                        />
                    <TextInput style={styles.input}
                        placeholder="Email"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        maxLength={64}
                        onChangeText={(e)=>this.setState({email:e})}
                        />
                    <TextInput style={styles.input}
                        placeholder="Password"
                        selectionColor="#fff"
                        secureTextEntry={true}
                        maxLength={32}
                        onChangeText={(e)=>this.setState({password:e})}
                        />
                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#66a1e7', 
                            borderRadius: 25, 
                            alignItems: 'center',
                            width: width / 1.5, 
                        
                            paddingVertical: 15, elevation: 3 }}
                            disabled={this.state.isLoading}
                            onPress={()=>this.handleSubmit()}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>{this.state.isLoading ? 'Loading':'Sign Up'}</Text>
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
                            onPress={()=>this.props.navigation.navigate('RegisterMitra')}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Sign Up As Partner</Text>
                    </TouchableOpacity>

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
    }
})