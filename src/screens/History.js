import React from 'react'
import { View, Text, Dimensions, Image, FlatList, ActivityIndicator} from 'react-native'
import Axios from 'axios'
const {height,width} = Dimensions.get('window')
import AsyncStorage from '@react-native-community/async-storage';
class History extends React.Component {
    constructor(){
        super()
        this.state={
            data:[],
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('token',async (err, result)=>{
            if (!err) {
                Axios.get('https://api-hot-book.herokuapp.com/booking/history',{
                    headers:{
                        authorization:result
                    }
                }).then(res=>this.setState({data:res.data.data})).catch(err=>console.log('err = ',err))
            } else {
                this.props.navigation.navigate('Login')
            }
        })
    }
    render() {
        const {data}=this.state
        console.log(data)
        return (
            <View style={{flex:1}}>
                {data.length>0
                ?
                <FlatList
                    data={data}
                    renderItem={({item})=>{
                        return(
                        <View style={{height:height/2.6, borderStyle:'solid', borderWidth:0.8, margin:15, shadowOpacity:5, elevation:5, opacity:0.8}}>
                            <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgMBrgzBUr13AmLnQZeLiOSXajpPpe6taNl3bATuhFML5Wsxz_'}} 
                                style={{backgroundColor:'red', height:'55%', marginHorizontal:5, marginTop:5, borderRadius:15}} />
                            
                            <Text style={{marginTop:5, marginLeft:10, fontWeight:'bold'}}>{item.company}</Text>

                            <View style={{marginTop:5, marginLeft:10, flexDirection:'row'}}>
                                <Text style={{opacity:0.8}}>From : </Text>
                                <Text style={{fontWeight:'bold'}} >{item.check_in.split('T')[0]}</Text>
                                <Text style={{opacity:0.8}}> Until : </Text>
                                <Text style={{fontWeight:'bold'}} >{item.check_out.split('T')[0]}</Text>
                            </View>
                            
                            <View style={{marginTop:5, marginLeft:10, flexDirection:'row'}}>
                                <Text style={{opacity:0.8}}>Amount : </Text>
                                <Text style={{fontWeight:'bold'}} >IDR.{item.amount}</Text>
                            </View>

                            <View style={{marginTop:5, marginLeft:10, flexDirection:'row'}}>
                                <Text style={{opacity:0.8}}>Transaction Id : </Text>
                                <Text style={{fontWeight:'bold'}} >{item.id_transaction}</Text>
                            </View>

                            <View style={{top:'45%', position:'absolute', right:'5%'}}>
                                <Text  style={{color:'white', fontSize:22, fontWeight:'bold'}} >{item.status}</Text>
                            </View>
                            
                        </View>
                        )
                    }}
                    keyExtractor={(item, index)=>index.toString()}
                />
                :
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large'/>
                </View>
                }
            </View>
        )
    }
}

export default History