import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authorization: false,
    token: null,
    firstName: null,
  },
  reducers: {
    setAuthorization: (state, action) => {
      const newState = { ...state };
      newState.authorization = action.payload;
      return newState;
    },
    setToken: (state, action) => {
      const newState = { ...state };
      newState.token = action.payload;
      return newState;
    },
    setFirstName: (state, action) => {
      const newState = { ...state };
      newState.FirstName = action.payload;
      return newState;
    },
    setAuth: (state, action) => {
      let newState = action.payload;
      return newState;
    },
  },
});

export const {
  setAuthorization,
  setToken,
  setFirstName,
  setAuth,
} = authSlice.actions;

export default authSlice.reducer;
