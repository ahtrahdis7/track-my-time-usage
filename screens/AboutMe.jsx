import * as React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
// import { WebView } from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from '../components/Themed';
import Pic from '../assets/images/me.jpg';

export default function AboutMe({ navigation }){
    // console.log("about is being rendered")
    return(
        <View style={styles.container}>
            <Image style={styles.image} source={Pic} />
            <Text style={styles.textHeader}>Hey, I am Sidhartha</Text>
            <Text style={styles.textNormal}>I took inspiration about for this application from one of Ankur Warikoo's strategy for measuring and increasing effective time usage.</Text>
            <Text style={styles.textNormal}>This app is being developed with the true purpose to measure your `time efficiency`.</Text>
            <Text style={styles.textHeader}>What is Time Efficiency ?</Text>
            <Text style={styles.textNormal}>The effective time usage in a 14hr slot all through the day. Here, you are given an input 
            box to grade your time usage for every hour of the day. Efficiency = SUM( Eff. Every Hour )/14 . Since, efficiency cannot be 100% every hour, I have introduced a bias factor of 1 per hour.</Text>
            
            <View>
                <Text style={{backgroundColor: '#ff7a7a',marginLeft: 5,marginRight:5, padding: 5}}>0-4</Text>
                <Text style={{backgroundColor: '#ffbd7a',marginLeft: 5,marginRight:5, padding: 5}}>4-6</Text>
                <Text style={{backgroundColor: '#8affa9',marginLeft: 5,marginRight:5, padding: 5}}>6-9</Text>
            </View>
            
            <Text style={styles.textNormal}>Mr. Warikoo believes that, in order to introduce efficiency into anything, you need to measure that first.</Text>
            
            <View style={{marginTop: 20}}>
                <Text style={styles.textHeader}>Want to get in touch ? Find me here</Text>
                <Pressable style={styles.Pressable} onPress={() => navigation.navigate('Web', {link: "https://github.com/ahtrahdis7"})}>
                    <Text style={{color: 'blue'}} > Github:// ahtrahdis7</Text>
                </Pressable>
                <Pressable style={styles.Pressable} onPress={() => navigation.navigate('Web', {link: "https://ahtrahdis7.netlify.app/"})}>
                    <Text style={{color: 'blue'}} > Web:// ahtrahdis7.netlify.app</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        textAlign: 'center',
        margin: 1,
        padding: 10,
    },
    textHeader:{
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        padding: 1,
    },
    textNormal:{
        fontSize: 15,
        // fontWeight: 'bold',
        margin: 5,
        padding: 1,
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 100
    },
    Pressable: {
        // margin: 5,
        height: 20,
        // backgroundColor: 'grey'
    }
})