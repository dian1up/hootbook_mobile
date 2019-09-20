import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView
} from 'react-native';
import Axios from 'axios'


export default class Craigslist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      isLoading: false,
      services: []
    };
  }

  componentDidMount = async () => {
    this.setState({
        isLoading: true,
    })
    const id = this.state.services.id
    await Axios.get('https://api-hot-book.herokuapp.com/services')
        .then(result => {
            console.warn('data', result)
            this.setState({
                services: result.data,
                isLoading: false
            })
        })
        .catch(err => {
            console.log(err)
        })
}


  clickEventListener = (item) => {
    Alert.alert('Message', 'Item clicked. '+item.name);
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={this.state.services}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("DetailMitra")}>
              <Image style={styles.image} source={{uri: "https://img.icons8.com/color/100/000000/real-estate.png"}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.room_type}</Text>
                <Text style={styles.count}>{item.price}</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> this.props.navigation.navigate("DetailMitra")}>
                  <Text style={styles.followButtonText}>Explore now</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("AddServices") }>
              <Image style={styles.image} source={require('../assets/images/add.png')} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>ADD SERVICES</Text>
                <TouchableOpacity style={styles.followButton} onPress={() => this.props.navigation.navigate("AddServices")}>
                </TouchableOpacity>
              </View>
      </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
}); 
