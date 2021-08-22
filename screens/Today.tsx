import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
/**
 *
 *
 * @export
 * @return {*} 
 */
export default function TabOneScreen() {
  const [eff, setEff] = React.useState(10);
  const [date, setDate] = React.useState(getDateFromDateString(JSON.stringify(new Date())));
  const [ EFF_COLOR, SET_EFF_COLOR ] = React.useState("#ff7a7a");
  const updateEff = React.useCallback((eff) => {
    setEff(Math.round(eff * 100) / 100);
  },[])
  
  React.useEffect(() => {
    /**
     * This function is used to do asuncronous operation inside the
     * UseEffect Hook. Without doing so, was fetching me an error.
     */
    const foo = async () => {
      let data;
      data = await AsyncStorage.getItem(date);
      data = JSON.parse(data);
      let eff = Math.round(data.eff * 100) / 100
      setEff(eff);
      if(eff >= 5) SET_EFF_COLOR("#8affa9");
      else if(eff >= 4) SET_EFF_COLOR("#ffbd7a")
      else SET_EFF_COLOR("#ff7a7a")

    };
    foo();
  },[date, eff])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{date}</Text>
      <Text style={{
        backgroundColor: EFF_COLOR,
        padding: 5,
        borderRadius: 5,
      }}>Time Efficieny : {eff}</Text>
      <ScrollView>
        {timeArray.map((time) => {
          return <CustomInput key={time} time={time} date={date} updateEff={updateEff}/>
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
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
