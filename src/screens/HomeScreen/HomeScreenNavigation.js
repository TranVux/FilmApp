import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import {FilmDetail, WatchFilmScreen} from '../FilmDetail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const StackHome = createStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <StackHome.Navigator screenOptions={{headerShown: false}}>
      <StackHome.Screen component={HomeScreen} name="HomeScreen" />
      <StackHome.Screen component={FilmDetail} name="FilmDetail" />
    </StackHome.Navigator>
  );
};

export default HomeScreenNavigation;
