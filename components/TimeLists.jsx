import * as React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, KeyboardAvoidingView } from './Themed';
import CustomInput from './TextInput';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

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
 *
 *
 * @export
 * @return {*} 
 */
export default function TimeLists(props) {
  const [eff, setEff] = React.useState(0);
  const [date, setDate] = React.useState(props.date);
  const [ EFF_COLOR, SET_EFF_COLOR ] = React.useState("#ff7a7a");
  
  const updateEff = React.useCallback((eff) => {
    setEff(Math.round(eff * 100) / 100);
  },[])
  
  React.useEffect(() => {
    /**
     * This function is used to do asuncronous operation inside the
     * UseEffect Hook. Without doing so, was fetching me an error.
     */
    console.log(props)
    const foo = async () => {
      let data;
      data = await AsyncStorage.getItem(date);
      data = JSON.parse(data);
      let eff = Math.round(data.eff * 100) / 100
      setEff(eff);
      if(eff >= 5) SET_EFF_COLOR("#013220");
      else if(eff >= 3) SET_EFF_COLOR("#ee7600")
      else SET_EFF_COLOR("#ff7a7a")

    };
    foo();
  },[date, eff])

  return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
              <Text style={styles.title}>{date}</Text>
              <Text style={[{
                  color: EFF_COLOR,
                  // padding: 5,
                  // borderRadius: 5,
              }, styles.title]}>η : {eff}</Text>
            </View>
            <ScrollView >
                {timeArray.map((time) => {
                return <CustomInput key={time} time={time} date={date} updateEff={updateEff}/>
                })}
            </ScrollView>
      </KeyboardAvoidingView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: HEIGHT/25,
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
  },
  separator: {
    // marginVertical: WIDTH/25,
    height: 1,
    width: '80%',
  },
});
