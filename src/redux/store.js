import {configureStore} from '@reduxjs/toolkit';

import isLoginSlice from './slices/isLoginSlice';
import dataUserSlice from './slices/dataUserSlice';
import dataFilmHistory from './slices/filmsHistorySlice';

const rootReducer = {
  isLogin: isLoginSlice,
  dataUser: dataUserSlice,
  filmHistory: dataFilmHistory,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
