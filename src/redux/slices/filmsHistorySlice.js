import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const filmsHistory = createSlice({
  initialState: [],
  name: 'filmHistory',
  reducers: {
    addHistoryItem: (state, actions) => {
      state.push(actions.payload);
      AsyncStorage.setItem('FilmHistory', JSON.stringify(state));
    },

    clearAllHistory: (state, actions) => {
      state.length = 0;
      AsyncStorage.setItem('FilmHistory', JSON.stringify([]));
    },
  },
  extraReducers: build => {
    build.addCase(setHistoryData.pending, state => {
      console.log('set history film pending!');
    });
    build.addCase(setHistoryData.fulfilled, (state, actions) => {
      console.log('set history film success');
      return actions.payload;
    });
    build.addCase(setHistoryData.rejected, state => {
      console.log('set history film failure');
      console.log('state when reject: ' + state);
    });
  },
});

export const setHistoryData = createAsyncThunk(
  'filmHistory/setHistoryData',
  async historyDat => {
    if (historyDat != null) return historyDat;
  },
);

const {actions, reducer} = filmsHistory;
export const {addHistoryItem, clearAllHistory} = actions;
export default reducer;
