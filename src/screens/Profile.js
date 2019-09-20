import React, { Component } from 'react';
import { Dimensions, Modal, Image, Text, View, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
    constructor(){
        super()

        this.state={
            isLoading:false,
        }
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    logOut = () => {
        this.setState({isLoading:true})
        AsyncStorage.clear((err)=>{
            if (!err) {
                this.setState({isLoading:false})
                this.props.navigation.navigate('Login')
            } else {
                this.setState({isLoading:false})
                Alert.alert('Error',err)
            }
        })
    }

    render() {
        // const address = this.state.address
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', backgroundColor: '#66a1e7', elevation: 5, height: 60, marginTop: 20, alignItems: 'center', paddingLeft: 20 }}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require('../assets/Icons/back.png')} style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 25 }}>My Profile</Text>
                </View>
                <View style={styles.conImage}>
                    <Image style={styles.image} source={require('../assets/images/bandung.jpg')} />
                    <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: '30%', width: 40, height: 40, backgroundColor: '#66a1e7', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/Icons/photo-camera.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/Icons/man.png')} />
                        </View>

                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Username </Text>
                            <Text style={styles.name}>pandri</Text>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/Icons/envelope.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Email</Text>
                            <Text style={styles.name}>email</Text>

                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image style={styles.place} source={require('../assets/Icons/history-clock-button.png')} />
                        </View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('History')} style={{ flex: 1, }}>
                            <Text style={styles.titleText}>History</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.logoutButton} onPress={() => { this.props.navigation.navigate('Edit') }} >
                            <Text style={[styles.buttonText]}>edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton} onPress={()=>this.logOut()}>
                            <Text style={[styles.buttonText]}>LOGOUT</Text>
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
export default withNavigation(Profile);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    conImage: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.3,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '48%',
        height: '90%',
        borderRadius: 110,
        borderWidth: 5,
        borderColor: 'white',
        position: 'relative'
    },
    conText: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
        padding: 10,
        backgroundColor: 'tomato'
    },
    name: {
        fontSize: 16,
    },
    address: {
        fontSize: 14,
    },
    conAdd: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 10,

    },
    place: {
        width: 20,
        height: 20
    },
    status: {
        fontSize: 16,
        color: '#6a717a'
    },
    logoutButton: {
        backgroundColor: '#66a1e7',
        paddingVertical: 15,
        marginTop: 20,
        marginHorizontal: 5,
        elevation: 5,
        flex: 1
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.6,
        backgroundColor: 'white',
    },
    wrapper: {
        flexDirection: 'row',
        borderBottomColor: '#dfe4ea',
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 5
    },
    wrapperIcon: {
        justifyContent: 'center',
        width: '20%'
    },
    titleText: {
        marginBottom: 5,
        color: '#6a717a'
    }

});