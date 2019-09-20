import React, { Component } from 'react';
import { Dimensions, Modal, Image, Text, View, ActivityIndicator, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';
import Jwt from "react-native-pure-jwt"
import Axios from 'axios'
import ImagePicker from 'react-native-image-picker'
import firebase from 'react-native-firebase'
import uuid from 'uuid/v4'; 

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            profile: [],
            isEdit: false,
            name: '',
            image:'',
            imageUrl: '',
            imageUri: '',
            upLoading: false,
            progress: 0,
            avatarSource: null,
            isSave:false,
            urlChange:'',
            tmp:''

        }
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
    }

    selectPhotoTapped() {
        this.setState({
            isSave:true
        })
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    imageUri: response.uri,
                });
            }
        });
    }
        uploadImage = () => {
            console.warn('haiiii')
            this.setState({
                isSave:false
            })

            const ext = this.state.imageUri.split('.').pop(); // Extract image extension
            const filename = `${uuid()}.${ext}`; // Generate unique name
            this.setState({ uploading: true });
            firebase
                .storage()
                .ref(`tutorials/images/${filename}`)
                .putFile(this.state.imageUri)
                .on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        let state = {};
                        state = {
                            ...state,
                            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
                        };
                        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {

                            state = {
                                ...state,
                                uploading: false,
                                imageUri: '',
                                imageUrl: snapshot.downloadURL,
                                progress: 0,
                                urlChange: snapshot.downloadURL
                            };
                        }
                        this.setState(state);

                    },
                    error => {
                        unsubscribe();
                        alert('Sorry, Try again.');
                    }
                );
        };

    goBack = () => {
        this.props.navigation.goBack()
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

    _isEdit = () => {
        this.setState({
            isEdit: true
        })
    }

    _isSave = () => {
        this.setState({
            isEdit: false
        })
    }

    componentDidMount = () => {
        this._makeRequest()
    }

    _makeRequest= () => {
        AsyncStorage.getItem('token', async (err, result) => {
            if (!err) {
                let decode = await this.decodeJwt(result.split(' ')[1])
                await Axios.get(`${config.host}/user/profile/`, {
                    headers: {
                        Authorization: result
                    }
                })
                    .then(res => {
                        console.warn(res, 'tete')
                        this.setState({
                            profile: res.data[0],
                            imageUrl: res.data[0].image
                        })
                    })
                    .catch(err => console.warn(err))
            } else {
                console.warn(err)
            }
        })
        this.subs = [
            this.props.navigation.addListener('willBlur', async () => {
                this.setState({
                    isEdit:false
                })
            })
        ]
    }

    logOut = () => {
        this.setState({ isLoading: true })
        AsyncStorage.clear((err) => {
            if (!err) {
                this.setState({ isLoading: false })
                this.props.navigation.navigate('Login')
                this.setState({
                    user: []
                })
            } else {
                this.setState({ isLoading: false })
                Alert.alert('Error', err)
            }
        })
    }

    _editData= async() => {
        const id = this.state.profile.id
        const data ={
            name: this.state.name,
            image: this.state.imageUrl
        }
        await Axios.patch(`${config.host}/user/${id}`,data)
        .then(() => {
            this._makeRequest()
            this.setState({
                isEdit:false
            })
        })
    }

    render() {
        const data = this.state.profile
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', backgroundColor: '#66a1e7', elevation: 5, height: 60, marginTop: 20, alignItems: 'center', paddingLeft: 20 }}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require('../assets/Icons/back.png')} style={{ marginTop: 5 }} />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 25 }}>My Profile</Text>
                </View>
                <View style={styles.conImage}>
                    <Image style={styles.image} source={{ uri: this.state.imageUrl }} />
                    {this.state.isEdit === true ?
                    <>
                    {this.state.isSave === true ? 
                        <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: '30%', width: 40, height: 40, backgroundColor: '#66a1e7', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }} onPress={this.uploadImage.bind(this)
                        }>
                            <Text style={{color:'#fff'}}>Save</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: '30%', width: 40, height: 40, backgroundColor: '#66a1e7', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }} onPress={this.selectPhotoTapped.bind(this)
                        }>
                            <Image source={require('../assets/Icons/photo-camera.png')} />
                        </TouchableOpacity>}
                        </> :
                        <></>}
                </View>
                <View style={styles.inputContainer}>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/Icons/man.png')} />
                        </View>

                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Username </Text>
                            {this.state.isEdit === true ?
                                <TextInput placeholder={data && data.name}
                                onChangeText={val => this.setState({'name':val})} /> :
                                <Text style={styles.name}>{data && data.name}</Text>}
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.wrapperIcon}>
                            <Image source={require('../assets/Icons/envelope.png')} />
                        </View>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.titleText}>Email</Text>
                            <Text style={styles.name}>{data && data.email}</Text>

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
                        {this.state.isEdit === true ?
                            <TouchableOpacity style={styles.logoutButton} onPress={this._editData} >
                                <Text style={[styles.buttonText]}>SAVE</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.logoutButton} onPress={this._isEdit} >
                                <Text style={[styles.buttonText]}>EDIT</Text>
                            </TouchableOpacity>}
                        <TouchableOpacity style={styles.logoutButton} onPress={() => this.logOut()}>
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
                    <View style={{ backgroundColor: '#f9f9f9', flex: 1, opacity: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                </Modal>
            </View>
        )
    }
}
export default Profile;
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