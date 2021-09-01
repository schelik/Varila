import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authKey: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
        state.authKey = action.payload;
    },
    signUp: (state, action) => {
        state.authKey = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, signUp } = authSlice.actions;

export default authSlice.reducer;