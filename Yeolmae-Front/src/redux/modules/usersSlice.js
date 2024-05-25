import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: { user: null, success: 'false' } };

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState;
    }
  }
});

export default usersSlice.reducer;
