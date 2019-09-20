import React from 'react'
import {View, Dimensions, TextInput, Image, TouchableOpacity, ScrollView, Text, StyleSheet} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase'
import uuid from 'uuid/v4'; 
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios';
import config from '../config/config';

const {width,height} = Dimensions.get('window')
export default class EditProfileMitra extends React.Component{

    constructor(props) {
      super(props);
      const profile = props.navigation.getParam('profile')
      this.state = {
          avatarSource: null,
          imageUrl:'',
          imageUri:'',
          uploading: false,
          progress: 0,
          profile,
          formData:{
            id: profile.id,
            name: profile.name,
            company: profile.company,
            image:profile.image
          }
      }
      console.warn(props.navigation.getParam('profile'))
      this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
      this.uploadImage = this.uploadImage.bind(this)
    }

    handleChange = (name, text) =>{
      let newFormData = this.state.formData
      newFormData[name] = text
      this.setState({formData:newFormData})
    }

    selectPhotoTapped() {
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
            let source = {uri: response.uri};
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source,
              imageUri:response.uri,
            });
          }
        });
      }
    
      uploadImage = () => {
        if(this.state.imageUri === ''){
          this.editProfile()
        }else{
          const ext = this.state.imageUri.split('.').pop(); // Extract image extension
          const filename = `${uuid()}.${ext}`; // Generate unique name
          this.setState({ uploading: true });
          return firebase
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
                    imageUrl:snapshot.downloadURL,
                    progress: 0,
                  };
                }
                this.setState(state,this.editProfile());
                
              },
              error => {
                unsubscribe();
                alert('Sorry, Try again.');
              }
            );
        }
    };
    editProfile = () => {
      let data = this.state.formData
      data.image = this.state.imageUrl
      Axios.patch(config.host +'/edit/partner',data,{
        headers:{
          Authorization: this.state.token
        }
      })
      .then(()=>{
        this.props.navigation.goBack()
      })
      .catch(console.log)
    }
    componentDidMount(){
      AsyncStorage.getItem('token',async (err, result)=>{
        if (!err) {
            this.setState({token:result})
        } else {
            console.warn(err)
        }
    })
    }

    render(){
      const {profile} = this.state
        return(
            <View style={{flex:1}}>
                <ScrollView>
                    <View style={{borderWidth:0, borderStyle:'solid',height:height/2.5, margin:15}}>
                        {this.state.avatarSource === null
                        ?
                            <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMJKd1IfYPwx8sGUXnnItiJ4SePsmShD-2Bh3gVBydbpBcRuPy'}} style={{backgroundColor:'red',width:'100%',height:'100%',borderRadius:10}}/>
                        :
                            <Image source={this.state.avatarSource} style={{backgroundColor:'red',width:'100%',height:'100%',borderRadius:10}}/>
                        }
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{right:15,bottom:15,width:30,height:30,borderRadius:10,position:'absolute'}}>
                            <Image source={require('../assets/images/edit.png')} style={{resizeMode:'stretch',width:30,height:30,borderRadius:10,position:'absolute'}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput onChangeText={(text) => this.handleChange('name',text)} placeholder={profile.name}/>
                    </View>

                    <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput onChangeText={(text) => this.handleChange('company',text)} placeholder={profile.company}/>
                    </View>

                    {/* <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput onChangeText={(text) => this.handleChange('email',text)} placeholder={profile.email}/>
                    </View> */}

                    <TouchableOpacity onPress={this.uploadImage.bind(this)} 
                        style={{ backgroundColor: '#66a1e7', 
                        borderRadius: 25,  
                        paddingVertical: 15, elevation: 3, marginTop:10, marginHorizontal:20 }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', alignSelf:'center'  }}>SAVE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{ backgroundColor: '#66a1e7', 
                        borderRadius: 25, 
                        paddingVertical: 15, elevation: 3, marginTop:10, marginHorizontal:20, marginBottom:10 }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', alignSelf:'center' }}>CANCEL</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}