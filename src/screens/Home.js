import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions,TextInput } from 'react-native'

const { width, height } = Dimensions.get('window')
class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bgImage}>
                    <Image
                        source={require('../assets/images/bg.jpg')}
                        style={{ width: '100%', height: '100%', borderBottomRightRadius: 100, borderBottomLeftRadius: 100, position: 'relative' }}
                    />
                    <View style={{ position: 'absolute', top: '40%', left: 0, zIndex: 1, height: '100%', width: '100%',padding:20 }}>
                        <View style={{backgroundColor: 'white',width:'100%',height:'100%',opacity:0.8,elevation:5,borderRadius:15,padding:10}}>
                            <TextInput placeholder='Location'
                            style={styles.searching}
                            /> 
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        height: height / 2.5,    
    },
    searching:{
        borderWidth:1,
        borderColor:'grey',
        borderRadius:25,
        padding:10
    }
})
