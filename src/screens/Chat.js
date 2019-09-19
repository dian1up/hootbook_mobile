import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Header, Left, Body, Spinner, Right  } from 'native-base';
class Chat extends React.Component {
    constructor(props) {
        super(props)
        const hotel = props.navigation.getParam('hotel')
        const user = props.navigation.getParam('user')
        const currentUser = props.navigation.getParam('currentUser')
        console.log(hotel, user, currentUser)
        const hotelRef = firebase
        .firestore()
        .collection('Messages')
        .doc(hotel._id)
        const userRef = firebase
        .firestore()
        .collection('Messages')
        .doc(user._id)

        const chatRef = hotelRef.collection(user._id)
            
        this.state = {
            messages: [],
            user,
            hotel,
            hotelRef,
            userRef,
            chatRef,
            currentUser,
        }
    }

    componentDidMount(){
        this.unsubsribe = this.state.chatRef.onSnapshot(this.onChatUpdate)
    }

    componentWillUnmount(){
        this.unsubsribe()
    }
    
    onChatUpdate = (snapshot)=>{
        console.log(snapshot)
        let messages = snapshot.docChanges.map(changes => {
            let data = changes.doc.data()
            data.createdAt = new Date(data.createdAt.seconds * 1000)
            return data
        })
        let appendedMessage =  GiftedChat.append(this.state.messages, messages)
        appendedMessage.sort((a, b)=>b.createdAt.getTime() - a.createdAt.getTime())
        this.setState({messages:appendedMessage})
    }

    onSend= async (messages = []) => {
        let message = messages[0]
        // message.createdAt = firebase.firestore.FieldValue.serverTimestamp()
        await this.state.chatRef.doc(message._id).set(message)
        if(this.state.currentUser === 'user'){
            let hotelInbox = await this.state.hotelRef.get()
            let userList = hotelInbox.get('userList') || []
            if( !userList.find(user => user._id === message.user._id) ){
                userList.push(message.user)
                this.state.hotelRef.set({userList})
            }

            let userInbox = await this.state.userRef.get()
            let hotelList = userInbox.get('hotelList') || []
            if( !hotelList.find(hotel => hotel._id == this.state.hotel._id) ){
                hotelList.push(this.state.hotel)
                this.state.userRef.set({hotelList})
            }
        }
    }
    render() {
        const { name, badgeCount, color, size } = this.props
        const currentUser = this.state.currentUser === 'hotel' ? this.state.hotel : this.state.user
        const targetUser = this.state.currentUser === 'hotel' ? this.state.user : this.state.hotel 
        return (
            <React.Fragment>
                <Header style={{backgroundColor:'#2196f3'}}>
                    <Left>
                        <Image 
                        source={{uri:targetUser.avatar}} 
                        style={{width:40, height:40}} 
                        />
                    </Left>
                    <Body>
                        <Text 
                        style={{fontSize:20, color:'white'}} 
                        >
                        {targetUser.name}
                        </Text>
                    </Body>
                    <Right/>
                </Header>
                <View style={{flex: 1}}>
                    <GiftedChat
                        showUserAvatar={false}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={currentUser}
                    />
                </View>
            </React.Fragment>
        )
    }
}

export default Chat