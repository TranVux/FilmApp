import {createSlice} from '@reduxjs/toolkit';

// value is a property of film item
const isValueChange = createSlice({
  initialState: false,
  name: 'isValueChange',
  reducers: {
    setValue: (state, action) => {
      return action.payload;
    },
  },
});

const {actions, reducer} = isValueChange;
export const {setValue} = actions;
export default reducer;
