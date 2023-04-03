import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppNavigator from './src/routers/AppNavigator';
import {StatusBar} from 'react-native';
import {Colors} from './src/assets/colors';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={Colors.primary} />
      <AppNavigator />
    </Provider>
  );
};

export default App;
