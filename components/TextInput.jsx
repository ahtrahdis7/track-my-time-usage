import React from "react";
import { Pressable, View, TextInput, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const storeData = async (key, time, value, eff) => {
//     try {
//         await AsyncStorage.setItem(key, value)
//     } catch (e) {
//         // saving error
//     }
// }

// const handleData = (key, time, input, eff) => {
    
// }


export default function CustomTextInput(props){
    // const [inputTime, onChangeinputTime] = React.useState(props.time);
    const [inputTask, onChangeinputTask] = React.useState("...task");
    const [inputEff, onChangeinputEff] = React.useState("0");
    let key = props.date
    , inputTime = props.time;
    // console.log(props);
    const onPressDone = async () => {
        if(await AsyncStorage.getItem(key) !== null){
            let prevData = await AsyncStorage.getItem(key);
            // prevData/
            prevData = JSON.parse(prevData);
            prevData[inputTime] = { task: inputTask, eff: inputEff }
            
            let eff = 0;

            for(let entry in prevData){
                
                if(entry !== "eff"){
                    // console.log(parseInt(prevData[entry].eff)/14.0);
                    eff += parseInt(prevData[entry].eff)/14.0;
                }
                    
            }
            prevData.eff = eff;
            await AsyncStorage.setItem(key, JSON.stringify(prevData));
            // prevData.
            // console.log(prevData);
        }else{
            await AsyncStorage.setItem(key, JSON.stringify({ eff: 0, inputTime : { task: inputTask, eff: inputEff } }));
        }
    }

    return(
        <View style={styles.view}>
            <Text style={styles.inputTime}> {inputTime} </Text>
            <TextInput 
            style={styles.inputTask}
            onChangeText={onChangeinputTask}
            value={inputTask} 
            />
            <TextInput 
            keyboardType="numeric"
            style={styles.inputEff}
            onChangeText={onChangeinputEff}
            value={inputEff} 
            />
            <Pressable style={styles.submit} onPress={onPressDone} > 
                <Text style={{fontSize: 30}}>
                ✓
                </Text> 
            </Pressable>
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
    },
    inputEff: {
        height: 40,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
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