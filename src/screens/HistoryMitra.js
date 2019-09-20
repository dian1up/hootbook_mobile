import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class Contacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      services: [
        {id:1,  name: "Hotel 1", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",           count:"Price: $10/Night"},
        {id:2,  name: "Hotel 2", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",       count:"Price: $10/Night"},
        {id:3,  name: "Hotel 3", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png", count:"Price: $10/Night"} ,
        {id:4,  name: "Hotel 4", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",    count:"Price: $10/Night"} ,
        {id:5,  name: "Hotel 5", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"} ,
        {id:6,  name: "Hotel 6", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"},
        {id:7,  name: "Hotel 7", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"},
        {id:8,  name: "Hotel 8", status: "Booked",  image:"https://img.icons8.com/color/100/000000/real-estate.png",        count:"Price: $10/Night"}
      
      ]
    };
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}>Check In</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.status}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={{ flex: 1, top: 20 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.services}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 18,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
}); 