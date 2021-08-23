/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Today from '../screens/Today';
import Edits from '../screens/Edits';
import TabTwoScreen from '../screens/History';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, AboutMeParamList } from '../types';
import AboutMe from '../screens/AboutMe';
import WebView from '../screens/WebView';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Current"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].tint, 
        keyboardHidesTabBar: true,
        style: {
          height: 60,
          borderTopColor: "#ffffff"
        }
      }}
      >
      <BottomTab.Screen
        name="Current"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Past Eff"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="bookmarks" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Developer"
        component={DevNav}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return (
    <View style={{
      borderColor: 'grey', 
      borderWidth: 0, 
      padding: 10, 
      borderRadius: 5,
    }}>
      <Text>
        <Ionicons size={25} style={{ marginBottom: 0 }} {...props} />
      </Text>
    </View>
  )
}



// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={Today}
        options={{ headerTitle: 'What are you doing today ?' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator
    initialRouteName="TabTwoScreen">
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'History' }}
      />
      <TabTwoStack.Screen
        name="EditHistory"
        component={Edits}
        options={{ headerTitle: 'Edit' }}
      />
    </TabTwoStack.Navigator>
  );
}


const DevStackNavigator = createStackNavigator<AboutMeParamList>();

function DevNav() {
  return (
    <DevStackNavigator.Navigator initialRouteName="Me">
      <DevStackNavigator.Screen
        name="Me"
        component={AboutMe}
        options={{ headerTitle: 'About ME' }}
      />
      <DevStackNavigator.Screen
        name="Web"
        component={WebView}
        options={{ headerTitle: '' }}
      />
    </DevStackNavigator.Navigator>
  );
}