import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const isLogin = createSlice({
  name: 'isLogin',
  initialState: false,
  reducers: {
    setIsLogin: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getIsLogin.pending, state => {
      console.log('Get isLogin pending');
    });
    builder.addCase(getIsLogin.fulfilled, (state, action) => {
      state.isLogin = action.payload;
    });
    builder.addCase(getIsLogin.rejected, state => {
      console.log('error get isLogin');
    });
  },
});

const getIsLogin = createAsyncThunk('isLogin/getIsLogin', async () => {
  const isLogin = await AsyncStorage.getItem('isLogin');
  if (isLogin != null) {
    return isLogin;
  } else {
    return null;
  }
});

const {reducer, actions} = isLogin;
export const {setIsLogin} = actions;
export default reducer;
