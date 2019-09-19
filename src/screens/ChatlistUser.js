import React from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { FlatList, TouchableNativeFeedback } from 'react-native-gesture-handler'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';
import JsonWebToken from "react-native-pure-jwt";
export default class ChatRoom extends React.Component{

  constructor() {
    super()
    this.state = {
      currentUserData:{},
      hotels:[],
    }
  }
  decodeJwt = (inputJwt) => {
    return JsonWebToken.decode(
        inputJwt, // the token
        config.secret, // the secret
        {
          skipValidation: true // to skip signature and exp verification
        }
      )
      .then(res => res) // already an object. read below, exp key note
      .catch(console.error);
  }
  onChangeChatList = snapshot => {
    let hotels = snapshot.get('hotelList')
    this.setState({hotels})
  }
  componentDidMount(){
    AsyncStorage.getItem('token',async (err, result)=>{
      if (!err) {
          let decode = await this.decodeJwt(result.split(' ')[1])
          console.log('data = ', decode.payload)

          this.setState({currentUserData:decode.payload})

          this.unsubscribe = firebase
            .firestore()
            .collection('Messages')
            .doc(decode.payload.email)
            .onSnapshot(this.onChangeChatList)
          
      } else {
          console.warn(err)
      }
    })
  }

  render(){
    let currentUser = 'user'
    const { currentUserData } = this.state
    let user = {
      _id: currentUserData.email,
      name: currentUserData.name,
      avatar: currentUserData.image || 'https://placeimg.com/140/140/any',
    }
    return (
      <FlatList
        renderItem={({ item, separators }) => (
          item !== null && item !== undefined ?
          <TouchableNativeFeedback 
            style={styles.rowBgColor}
            >
              <Image
                source={{uri:item.avatar}}
                style={styles.avatarImageStyle}
                onPress={()=>{this.props.navigation.navigate('Chat', {hotel:item,user,currentUser})}} 
              />
              <View style={styles.contentColor}>
                <Text onPress={()=>{this.props.navigation.navigate('Chat', {hotel:item,user,currentUser})}}  style={styles.rowText}>{item.name}</Text>
              </View>
          </TouchableNativeFeedback>
          :<View></View>
        )}
        data={this.state.hotels}
        keyExtractor={(item)=> item !== null && item !== undefined ? item._id:item}
        style={styles.list}
      />
    )
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 8
  },
  list: {
    marginTop:20,
    flex: 1,
    backgroundColor: "#FFF"
  },
  rowBgColor: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16
  },
  avatarImageStyle: {
    height:40,
    width:40,
    borderRadius: 20,
  },
  contentColor: {
    left: 72,
    height: 56,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    paddingRight: 16
  },
  rowText: {
    color: "#212121",
    fontSize: 16
  },
  iconStyle: {
    fontSize: 24,
    color: "#CCCCCC",
    position: "absolute",
    right: 16
  }
});