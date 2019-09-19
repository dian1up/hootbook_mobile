import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text, Image } from 'react-native'
import firebase from 'react-native-firebase'
import { Header, Left, Body, Spinner, Right  } from 'native-base';
class Chat extends React.Component {
    constructor(props) {
        super(props)
        const hotel = {
            _id:'hotel@gmail.com',
            name:'hotel',
            avatar:'https://placeimg.com/140/140/any'
        }
        const user = {
            _id: 'user@gmail.com',
            name: 'user',
            avatar: 'https://firebasestorage.googleapis.com/v0/b/yu-chat.appspot.com/o/User.png?alt=media&token=79e7b969-046c-4657-9558-b65a1812e388',
        }
        const currentUser = 'hotel'
        // const hotel = props.navigation.getParam('hotel')
        // const user = props.navigation.getParam('user')
        // const currentUser = props.navigation.getParam('currentUser')
        const chatRef = firebase
            .firestore()
            .collection('Messages')
            .doc(hotel._id)
            .collection(user._id)
            
        this.state = {
            messages: [],
            user,
            hotel,
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

    onSend(messages = []) {
        let message = messages[0]
        this.state.chatRef.doc(message._id).set(message)
    }
    render() {
        const { name, badgeCount, color, size } = this.props
        const currentUser = this.state.currentUser === 'hotel' ? this.state.hotel : this.state.user
        const targetUser = this.state.currentUser === 'hotel' ? this.state.user : this.state.userthis.state.hotel 
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