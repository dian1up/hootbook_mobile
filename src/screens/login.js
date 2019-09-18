import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')
class Login extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent backgroundColor='#295989' barStyle='light-content' />
                <Image
                    source={require('../assets/images/bg4.png')}
                    style={{ marginBottom: 20 }}
                />
                <View style={{ height: height / 3, backgroundColor: '#fff' }}>
                    <TextInput
                        placeholder='email'
                        keyboardType='email-address'
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='password'
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#66a1e7', borderRadius: 25, alignItems: 'center', paddingVertical: 15, elevation: 3 }}>
                        <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff' }}>Sign In</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', }}>
                        <View>
                            <Text style={{ color: 'grey' }}>Dont have an Account?</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
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