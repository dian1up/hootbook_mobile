import React from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
const { height, width } = Dimensions.get('window')
class ProfileMitra extends React.Component {

    constructor(){
        super()

        this.state={
            isLoading:false,
        }
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
        return (
            <View style={{flex:1}}>
                <View style={{ height:height/2.5, width:width}}>
                    <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMJKd1IfYPwx8sGUXnnItiJ4SePsmShD-2Bh3gVBydbpBcRuPy'}} style={{ height:'100%', width:'100%', resizeMode:'stretch', borderBottomLeftRadius:15, borderBottomRightRadius:15,}}/>
                </View>
                <View 
                style={{backgroundColor:'#f9f9f9',borderWidth:1, borderStyle:'solid', 
                elevation:5,borderColor:'#f9f9f9',opacity:0.8,
                height:width/2, width:width/1.3, position:'absolute',borderRadius:10, 
                alignSelf:'center',top:'30%', padding:10,}}>

                    <View style={{ height:'35%', width:'45%', alignSelf:'center', marginTop:10, borderRadius:10}}>
                        <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMJKd1IfYPwx8sGUXnnItiJ4SePsmShD-2Bh3gVBydbpBcRuPy'}} style={{backgroundColor:'red',height:'100%', width:'100%', borderRadius:10}}/>
                    </View>
                    <Text style={{alignSelf:'center', fontSize:22, fontFamily:'Roboto', marginTop:10}}>NTech Malang</Text>
                    <Text style={{alignSelf:'center', fontSize:15, fontFamily:'Roboto', marginTop:5}}>Hotel</Text>

                       
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditProfileMitra')}  style={{ height:50, width:50, position:'absolute', bottom:'5%', left:'5%'}}>
                        <Image source={require('../assets/images/edit.png')} style={{ height:50, width:50, resizeMode:'stretch',}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.logOut()} style={{ height:50, width:50, position:'absolute', bottom:'5%', right:'5%'}}>
                        <Image source={require('../assets/images/power-button-off.png')} style={{ height:50, width:50, resizeMode:'stretch',}}/>
                    </TouchableOpacity>
                        
                       

                </View>

                <View
                style={{height:width/2, width:width,
                alignSelf:'center',top:'20%'}}>
                <ScrollView>
                    <Text style={{alignSelf:'flex-start', fontSize:22, fontFamily:'Roboto', marginTop:5, marginLeft:10}}>About Me</Text>
                    
                    <View style={{borderStyle:'dashed', borderBottomWidth:0.2, height:75, flexDirection:'row', marginHorizontal:10}}>
                    <Image source={require('../assets/images/profile.png')} style={{resizeMode:'stretch', height:50, width:50, marginVertical:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20, marginTop:5, fontFamily:'Roboto', fontWeight:'500'}}>Owner Name</Text>
                            <Text style={{marginTop:5, fontWeight:'100'}}>diancandra112@gmail.com</Text>
                        </View>
                    </View>

                    <View style={{borderStyle:'dashed', borderBottomWidth:0.2, height:75, flexDirection:'row', marginHorizontal:10}}>
                        <Image source={require('../assets/images/email.png')} style={{resizeMode:'stretch', height:50, width:50, marginVertical:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20, marginTop:5, fontFamily:'Roboto', fontWeight:'500'}}>GMAIL</Text>
                            <Text style={{marginTop:5, fontWeight:'100'}}>diancandra112@gmail.com</Text>
                        </View>
                    </View>
                    
                    <View style={{borderStyle:'dashed', borderBottomWidth:0.2, flexDirection:'row', marginHorizontal:10}}>
                        <Image source={require('../assets/images/address.png')} style={{resizeMode:'stretch', height:50, width:50, marginVertical:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20, marginTop:5, fontFamily:'Roboto', fontWeight:'500'}}>ADDRESS</Text>
                            <Text style={{marginTop:5, fontWeight:'100'}}>diancandra112@gmail.com aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                        </View>
                    </View>

                </ScrollView>
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

export default ProfileMitra

