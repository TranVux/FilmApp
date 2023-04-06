import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './SearchScreen';
import SearchResult from './SearchResult';
import {FilmDetail} from '../FilmDetail';

const StackHome = createStackNavigator();

const SearchNavigatorScreen = () => {
  return (
    <StackHome.Navigator
      initialRouteName="SearchScreen"
      screenOptions={{presentation: 'transparentModal', headerShown: false}}>
      <StackHome.Screen component={SearchScreen} name="SearchScreen" />
      <StackHome.Screen component={FilmDetail} name="FilmDetailSearchScreen" />
      <StackHome.Screen component={SearchResult} name="SearchResult" />
    </StackHome.Navigator>
  );
};

export default SearchNavigatorScreen;
