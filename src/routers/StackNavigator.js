import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WatchFilmScreen} from '../screens/FilmDetail';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={WatchFilmScreen} name="WatchFilmScreen" />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
