import React from 'react'
import {View, Dimensions, TextInput, Image, TouchableOpacity, ScrollView, Text} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase'
import uuid from 'uuid/v4'; 

const {width,height} = Dimensions.get('window')
export default class EditProfileMitra extends React.Component{

    constructor(props) {
        super(props);
            this.state = {
                avatarSource: null,
                imageUrl:'',
                imageUri:'',
                uploading: false,
                progress: 0,
            }
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
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
        console.log('haiiii')
        
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
                  imageUrl:snapshot.downloadURL,
                  progress: 0,
                };
              }
              this.setState(state);
              console.log(this.state.imageUrl);
              
            },
            error => {
              unsubscribe();
              alert('Sorry, Try again.');
            }
          );
    };

    render(){
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
                        <TextInput placeholder='Owner Name'/>
                    </View>

                    <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput placeholder='Company Name'/>
                    </View>

                    <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput placeholder='Email'/>
                    </View>

                    
                    <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput placeholder='Latitude'/>
                    </View>

                    <View style={{borderBottomWidth:0.8, borderStyle:'solid', marginHorizontal:10, marginTop:10}}>
                        <TextInput placeholder='Longitude'/>
                    </View>

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
                        paddingVertical: 15, elevation: 3, marginTop:10, marginHorizontal:20 }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', alignSelf:'center' }}>CANCEL</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}