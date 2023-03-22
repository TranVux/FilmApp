import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserScreen} from '../screens/UserScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SearchScreen from '../screens/SearchScreen';
import {Colors} from '../assets/colors';
import {IconHeart, IconHome, IconSearch, IconUser} from '../assets/svgs';
import HomeScreenNavigation from '../screens/HomeScreen/HomeScreenNavigation';

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
            case 'SearchScreen':
              return (
                <IconSearch
                  width={24}
                  height={24}
                  fillColor={focused ? Colors.red : '#fff'}
                />
              );
            case 'FavoriteScreen':
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
      <BottomTab.Screen component={SearchScreen} name="SearchScreen" />
      <BottomTab.Screen component={FavoriteScreen} name="FavoriteScreen" />
      <BottomTab.Screen component={UserScreen} name="UserScreen" />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
