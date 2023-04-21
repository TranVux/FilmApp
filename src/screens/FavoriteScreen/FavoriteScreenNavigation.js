import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteScreen from './FavoriteScreen';
import {FilmDetail, WatchFilmScreen} from '../FilmDetail';

const StackFavorite = createStackNavigator();

const FavoriteScreenNavigation = () => {
  return (
    <StackFavorite.Navigator
      screenOptions={{presentation: 'transparentModal', headerShown: false}}>
      <StackFavorite.Screen component={FavoriteScreen} name="FavoriteScreen" />
      <StackFavorite.Screen
        component={FilmDetail}
        name="FilmDetailFavoriteScreen"
      />
    </StackFavorite.Navigator>
  );
};

export default FavoriteScreenNavigation;
