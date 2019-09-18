import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
const { height, width } = Dimensions.get('window')
class ProfileMitra extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{backgroundColor:'red', borderWidth:1, borderStyle:'solid', height:height/2.5, width:width, borderBottomStartRadius:20, borderBottomEndRadius:20}}>
                    <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMJKd1IfYPwx8sGUXnnItiJ4SePsmShD-2Bh3gVBydbpBcRuPy'}} style={{ height:200, width:200, resizeMode:'stretch'}}/>
                </View>
                <View 
                style={{backgroundColor:'green',borderWidth:1, borderStyle:'solid', 
                height:width/2, width:width/1.3, position:'absolute',borderRadius:10, 
                alignSelf:'center',top:'30%', padding:10,}}>

                    <View style={{ height:'35%', width:'45%', alignSelf:'center', marginTop:10, borderRadius:10}}>
                        <Image style={{backgroundColor:'red',height:'100%', width:'100%', borderRadius:10}}/>
                    </View>
                    <Text style={{alignSelf:'center', fontSize:22, fontFamily:'Roboto', marginTop:10}}>NTech Malang</Text>
                    <Text style={{alignSelf:'center', fontSize:15, fontFamily:'Roboto', marginTop:5}}>Hotel</Text>

                        <Image source={require('../assets/images/edit.png')} style={{ height:50, width:50, resizeMode:'stretch', position:'absolute', bottom:'5%', left:'5%'}}/>
                       

                </View>

                <View
                style={{height:width/2, width:width,
                alignSelf:'center',top:'20%'}}>
                <ScrollView>
                    <Text style={{alignSelf:'flex-start', fontSize:22, fontFamily:'Roboto', marginTop:5, marginLeft:10}}>About Me</Text>
                    
                    <View style={{borderStyle:'dashed', borderBottomWidth:0.2, height:75, flexDirection:'row', marginHorizontal:10}}>
                        <Image style={{backgroundColor:'red', height:50, width:50, marginVertical:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20, marginTop:5, fontFamily:'Roboto', fontWeight:'500'}}>Owner Name</Text>
                            <Text style={{marginTop:5, fontWeight:'100'}}>diancandra112@gmail.com</Text>
                        </View>
                    </View>

                    <View style={{borderStyle:'dashed', borderBottomWidth:0.2, height:75, flexDirection:'row', marginHorizontal:10}}>
                        <Image style={{backgroundColor:'red', height:50, width:50, marginVertical:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20, marginTop:5, fontFamily:'Roboto', fontWeight:'500'}}>GMAIL</Text>
                            <Text style={{marginTop:5, fontWeight:'100'}}>diancandra112@gmail.com</Text>
                        </View>
                    </View>
                    
                    <View style={{borderStyle:'dashed', borderBottomWidth:0.2, flexDirection:'row', marginHorizontal:10}}>
                        <Image style={{backgroundColor:'red', height:50, width:50, marginVertical:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:20, marginTop:5, fontFamily:'Roboto', fontWeight:'500'}}>ADDRESS</Text>
                            <Text style={{marginTop:5, fontWeight:'100'}}>diancandra112@gmail.com aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
                        </View>
                    </View>

                </ScrollView>
                </View>
            </View>
        )
    }
}

export default ProfileMitra

