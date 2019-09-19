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


export default class Craigslist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible:false,
      userSelected:[],
      data: [
        {id:1,  name: "Hotel 1",   image:"https://img.icons8.com/color/100/000000/real-estate.png",           count:"Price: $10/Night"},
        {id:2,  name: "Hotel 2",    image:"https://img.icons8.com/color/100/000000/real-estate.png",       count:"Price: $10/Night"},
        {id:3,  name: "Hotel 3",       image:"https://img.icons8.com/color/100/000000/real-estate.png", count:"Price: $10/Night"} ,
        {id:4,  name: "Hotel 4",   image:"https://img.icons8.com/color/100/000000/real-estate.png",    count:"Price: $10/Night"} ,
        {id:5,  name: "Hotel 5",   image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"} ,
        {id:6,  name: "Hotel 6",   image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"},
        {id:7,  name: "Hotel 7",   image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"},
        {id:8,  name: "Hotel 8",   image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"}
      ]
    };
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
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item)}}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.count}</Text>
                <TouchableOpacity style={styles.followButton} onPress={()=> this.clickEventListener(item)}>
                  <Text style={styles.followButtonText}>Explore now</Text>  
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}}/>
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("HomeMitra") }>
              {/* <Image style={styles.image} source={{uri: add}}/> */}
              <Image style={styles.image} source={require('../assets/images/add.png')} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>ADD SERVICES</Text>
                <TouchableOpacity style={styles.followButton} onPress={() => this.props.navigation.navigate("HomeMitra")}>
                  <Text style={styles.followButtonText}>Explore now</Text>  
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
