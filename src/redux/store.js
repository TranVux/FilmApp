import {configureStore} from '@reduxjs/toolkit';

import isLoginSlice from './slices/isLoginSlice';
import dataUserSlice from './slices/dataUserSlice';

const rootReducer = {
  isLogin: isLoginSlice,
  dataUser: dataUserSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
