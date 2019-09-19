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
} from 'react-native';

const { width, height } = Dimensions.get('window')

export default class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData: {
                    name: '',
                    email: '',
                    password: '',  
                    },
            isLoading: false,
        }
    }

    submit = () => {
        Alert.alert('SIGN UP');
    }

    changerValue = field => value => { this.setState({[field]:value})}

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
                        onChangeText={this.changerValue('name')}
                        onSubmitEditing={()=> this.formData.email.focus()}/>
                    <TextInput style={styles.input}
                        placeholder="Email"
                        selectionColor="#fff"
                        keyboardType="email-address"
                        maxLength={64}
                        onChangeText={this.changerValue('email')}
                        onSubmitEditing={()=> this.formData.company.focus()}/>
                    <TextInput style={styles.input}
                        placeholder="Password"
                        selectionColor="#fff"
                        secureTextEntry={true}
                        maxLength={32}
                        onChangeText={this.changerValue('password')}
                        onSubmitEditing={()=> this.formData.password.focus()}/>
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