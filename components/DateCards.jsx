import React, { useState, useEffect } from 'react';
import { Text, View } from '../components/Themed';
import { StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


let timeArray =  [
    '10:00', '11:00',
    '12:00', '13:00',
    '14:00', '15:00',
    '16:00', '17:00',
    '18:00', '19:00',
    '20:00', '21:00',
    '22:00', '23:00'
  ];

export default function DateCard(props){
    const [ EFF_COLOR, SET_EFF_COLOR ] = useState("#ff7a7a");

    let eff = Math.round(props.date[1] * 100) / 100;

    useEffect(() => {
        if(eff >= 5) SET_EFF_COLOR("#8affa9");
        else if(eff >= 3) SET_EFF_COLOR("#ffbd7a")
        else SET_EFF_COLOR("#ff7a7a")
    }, [EFF_COLOR])

    const HandlePress = () => {
        console.log(props)
        props.navigation.navigate('EditHistory', { date: props.date[0]})
    }

    return(
        <View style={{
            padding: 10,
            margin: 5,
            borderRadius: 5,
            backgroundColor: EFF_COLOR,
        }}>
            <Pressable onPress={HandlePress}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    backgroundColor: EFF_COLOR
                }}>
                    <Text>{props.date[0]}</Text>
                    <Text>{eff}</Text>
                </View> 
            </Pressable>
        </View>
    )
}

// const styles = StyleSheet.create({
//     card: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'stretch',
//         justifyContent: 'space-between',
//         padding: 10,
//         margin: 5,
//         borderRadius: 5,
//         backgroundColor: '#e6e6e6'
//     }
// })