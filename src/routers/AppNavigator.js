import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import {SettingScreen} from '../screens/UserScreen';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import {SearchResult} from '../screens/SearchScreen';
import {WatchFilmScreen} from '../screens/FilmDetail';

const AppStack = createStackNavigator();

const STACK_SCREEN = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
  },
  {
    name: 'WatchFilmScreen',
    component: WatchFilmScreen,
  },
  {
    name: 'SettingScreen',
    component: SettingScreen,
  },
  {
    name: 'SearchResultScreen',
    component: SearchResult,
  },
];

const AppNavigator = () => {
  const isLogin = useSelector(state => state.isLogin);
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{headerShown: false, presentation: 'transparentModal'}}>
        {/* <AppStack.Screen component={WebViewScreen} name="WatchFilmScreen" /> */}
        <AppStack.Screen component={SplashScreen} name="SplashScreen" />
        <AppStack.Screen component={BottomNavigator} name="BottomNavigator" />
        {STACK_SCREEN.map(screen => {
          return (
            <AppStack.Screen
              key={screen.name}
              component={screen.component}
              name={screen.name}
            />
          );
        })}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
