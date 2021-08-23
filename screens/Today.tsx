import * as React from 'react';
// import { StyleSheet, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
// import CustomInput from '../components/TextInput';
import TimeLists from '../components/TimeLists';


/**
 * Used to parse the date string for suitable representable format.
 * 
 * @param {string} dateString
 * @return {*} 
 */

function getDateFromDateString(dateString: string){
  let date = dateString.split("T")[0];
  date = date.substr(1, date.length-1);
  return date;
}

export default function TabOneScreen() {

  const [ date, setDate ] = React.useState(getDateFromDateString(JSON.stringify(new Date())));
  // console.log(date)
  return(

      <TimeLists date={date} />

  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 10,
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });
