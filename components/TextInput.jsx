import React from "react";
import { Pressable, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useColorScheme from "../hooks/useColorScheme";
import { View, Text } from "./Themed";
import Colors from "../constants/Colors";
/**
 *
 *
 * @export
 * @param {*} props
 * @return {*} 
 */


export default function CustomTextInput(props){
    const colorScheme = useColorScheme();
    // console.log(colorScheme)
    const [ inputTask, onChangeinputTask ] = React.useState("...task");
    const [ inputEff, onChangeinputEff ] = React.useState("0");
    const [ COLOR, SET_COLOR ] = React.useState(Colors[colorScheme].timeBackground);
    const [ EFF_COLOR, SET_EFF_COLOR ] = React.useState("#ff7a7a");
    let key = props.date
    , inputTime = props.time;
    React.useEffect(() => {
        /**
         * This function is used to do asuncronous operation inside the
         * UseEffect Hook. Without doing so, was fetching me an error.
         */
        async function getPrevData(){
            let prevData = await AsyncStorage.getItem(key);
            prevData = JSON.parse(prevData);
            onChangeinputEff(prevData[inputTime] != undefined ? prevData[inputTime].eff: "0");
            onChangeinputTask(prevData[inputTime] != undefined ? prevData[inputTime].task: "...task");
            if(inputTask !== "...task" ) SET_COLOR(Colors[colorScheme].tbf);
            if(inputTime >= parseInt(7) ) SET_EFF_COLOR(Colors[colorScheme].tbf);
            else if(inputTime >= 4) SET_EFF_COLOR("#ffbd7a")
            else SET_EFF_COLOR("#ff7a7a")
        };
        getPrevData();
        
    },[]);

    React.useEffect(() => {
        /**
         * This function is used to do asuncronous operation inside the
         * UseEffect Hook. Without doing so, was fetching me an error.
         */
        async function asuncFunction(){
            if(await AsyncStorage.getItem(key) !== null){
                let prevData = await AsyncStorage.getItem(key);
                prevData = JSON.parse(prevData);
                prevData[inputTime] = { task: inputTask, eff: inputEff }
                let eff = 0;
                for(let entry in prevData){
                    if(entry !== "eff"){
                        eff += (parseInt(prevData[entry].eff))/14.0;
                    }   
                }

                if(inputTask !== "...task" ) SET_COLOR(Colors[colorScheme].tbf);
                // console.log(inputTime)
                if(inputEff >= 7) SET_EFF_COLOR(Colors[colorScheme].tbf);
                else if(inputEff >= 4) SET_EFF_COLOR("#ffbd7a")
                else SET_EFF_COLOR("#ff7a7a")

                prevData.eff = eff;
                props.updateEff(eff);
                await AsyncStorage.setItem(key, JSON.stringify(prevData));
            }else{
                await AsyncStorage.setItem(key, JSON.stringify({ eff: 0, inputTime : { task: inputTask, eff: inputEff } }));
            }
        }
        asuncFunction();
    },[inputEff, inputTask]);

    return(
        <View style={styles.view}>
            <Text style={{
                height: 40,
                margin: 5,
                borderWidth: 1,
                borderRadius: 5,
                width: 60,
                padding: 10,
                textAlign: 'center',
                backgroundColor: COLOR,
                // color: 
            }}> {inputTime} </Text>
            <TextInput 
            style={{
                height: 40,
                margin: 5,
                borderWidth: 1,
                borderRadius: 5,
                width: 200,
                padding: 10,
                backgroundColor: Colors[colorScheme].timeBackground,
                color: Colors[colorScheme].text,
            }}
            onChangeText={onChangeinputTask}
            value={inputTask} 
            />
            <TextInput 
            keyboardType="numeric"
            style={{
                height: 40,
                margin: 5,
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                textAlign: 'center',
                backgroundColor: EFF_COLOR
            }}
            onChangeText={onChangeinputEff}
            maxLength={1}
            value={inputEff} 
            />
        </View> 
    )
}


const styles = StyleSheet.create({
    view:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    inputTime: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: 60,
        padding: 10,
        textAlign: 'center',
        
    },
    inputTask: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        padding: 10,
        // backgroundColor: Colors[colorScheme].timeBackground,
    },
    inputEff: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        // backgroundColor: EFF_COLOR
    },
    submit: {
        height: 40,
        margin: 5,
        width: 60,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        backgroundColor: "#e6e6e6"
    }
});