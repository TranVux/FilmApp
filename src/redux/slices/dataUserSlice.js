import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const dataUser = createSlice({
  name: 'dataUser',
  initialState: {},
  reducers: {
    deleteDataUser: (state, actions) => {
      return {};
    },
  },
  extraReducers: builder => {
    builder.addCase(setDataUser.pending, state => {
      console.log('pending');
    });
    builder.addCase(setDataUser.fulfilled, (state, actions) => {
      console.log('set data user success');
      return actions.payload;
    });
    builder.addCase(setDataUser.rejected, state => {
      console.log('state when reject: ' + state);
    });
  },
});

export const setDataUser = createAsyncThunk(
  'dataUser/setDataUser',
  async dataUser => {
    if (dataUser != null) return dataUser;
  },
);

const {actions, reducer} = dataUser;
export const {deleteDataUser} = actions;
export default reducer;
