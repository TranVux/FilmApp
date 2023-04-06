import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import {FilmDetail} from '../FilmDetail';

const StackHome = createStackNavigator();

const HomeScreenNavigation = () => {
  return (
    <StackHome.Navigator
      screenOptions={{presentation: 'transparentModal', headerShown: false}}>
      <StackHome.Screen component={HomeScreen} name="HomeScreen" />
      <StackHome.Screen component={FilmDetail} name="FilmDetail" />
    </StackHome.Navigator>
  );
};

export default HomeScreenNavigation;
