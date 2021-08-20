import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import CustomInput from '../components/TextInput';

let timeArray =  [
  '10:00', '11:00',
  '12:00', '13:00',
  '14:00', '15:00',
  '16:00', '17:00',
  '18:00', '19:00',
  '20:00', '21:00',
  '22:00', '23:00'
];

function getDateFromDateString(dateString: string){
  let date = dateString.split("T")[0];
  date = date.substr(1, date.length-1);
  return date;
}

export default function TabOneScreen() {
  let date = getDateFromDateString(JSON.stringify(new Date()));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{date}</Text>
      <ScrollView>
        {timeArray.map((time) => {
          return <CustomInput key={time} time={time} date={date}/>
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
