import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DateCard from '../components/DateCards';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen({ navigation }) {
  const [ allDatesData, setData ] = React.useState([]);
  // const [ keys, setKeys ] = React.useState([]);

  React.useEffect(() => {
    const getKeys = async () => {
      const keys = await AsyncStorage.getAllKeys();
      let allData = await AsyncStorage.multiGet(keys);

      for(let d of allData){
        d[1] = JSON.parse(d[1]).eff;
      }
      // console.log(allData);
      // setKeys(keys);
      setData(allData);
    };
    getKeys();
    console.log(navigation)
  },[]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {allDatesData.map(key => {
          return <DateCard navigation={navigation} key={key[0]} date={key} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
