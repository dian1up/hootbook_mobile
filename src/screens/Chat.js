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
        // const hotel = props.navigation.getParam('hotel')
        // const user = props.navigation.getParam('user')
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
        }
    }
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })
    }
    
    onSend(messages = []) {
        let message = messages[0]

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    openPartnerProfile= () => {
        
    }
    render() {
        const { name, badgeCount, color, size } = this.props
        return (
            <View style={{flex: 1}}>
                <Header style={{backgroundColor:'#2196f3'}}>
                {
                // Object.keys(this.state.targetUser).length !== 0 ? 
                //     <React.Fragment>
                //     <Left>
                //         <Image 
                //         source={{uri:this.state.targetUser.photoURL}} 
                //         style={{width:40, height:40}} 
                //         />
                //     </Left>
                //     <Body>
                //         <Text 
                //         style={{fontSize:20, color:'white'}} 
                //         onPress={this.openFriendProfile} 
                //         >
                //         {this.state.targetUser.username}
                //         </Text>
                //     </Body>
                //     <Right/>
                //     </React.Fragment>
                // :
                // <React.Fragment><Spinner color='black' /></React.Fragment>
                }
                </Header>
                <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                onPressAvatar={this.openPartnerProfile}
                user={this.state.currentUser}
                />
            </View>
        )
    }
}

export default Chat