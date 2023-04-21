import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserScreen} from '../screens/UserScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import {Colors} from '../assets/colors';
import {IconHeart, IconHome, IconSearch, IconUser} from '../assets/svgs';
import HomeScreenNavigation from '../screens/HomeScreen/HomeScreenNavigation';
import SearchNavigatorScreen from '../screens/SearchScreen/SearchScreenNavigator';
import FavoriteScreenNavigation from '../screens/FavoriteScreen/FavoriteScreenNavigation';

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({navigation}) => {
  React.useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      return;
    });
  }, [navigation]);

  return (
    <BottomTab.Navigator
      // initialRouteName="FavoriteScreen"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'HomeScreenNavigation':
              return (
                <IconHome
                  width={24}
                  height={24}
                  fillColor={focused ? Colors.red : '#fff'}
                />
              );
            case 'UserScreen':
              return (
                <IconUser
                  width={24}
                  height={24}
                  fillColor={focused ? Colors.red : '#fff'}
                />
              );
            case 'SearchNavigatorScreen':
              return (
                <IconSearch
                  width={24}
                  height={24}
                  fillColor={focused ? Colors.red : '#fff'}
                />
              );
            case 'FavoriteScreenNavigation':
              return (
                <IconHeart
                  width={24}
                  height={24}
                  fillColor={focused ? Colors.red : '#fff'}
                />
              );
          }
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: Colors.secondary,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          position: 'absolute',
          borderTopColor: Colors.primary,
        },
      })}>
      <BottomTab.Screen
        component={HomeScreenNavigation}
        name="HomeScreenNavigation"
      />
      <BottomTab.Screen
        component={SearchNavigatorScreen}
        name="SearchNavigatorScreen"
      />
      <BottomTab.Screen
        component={FavoriteScreenNavigation}
        name="FavoriteScreenNavigation"
      />
      <BottomTab.Screen component={UserScreen} name="UserScreen" />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
