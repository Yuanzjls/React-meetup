import { createSlice } from "@reduxjs/toolkit";
export const peopleSlice = createSlice({
  name: "people",
  initialState: null,
  reducers: {
    setPeople: (state, action) => {
      const newState = action.payload;
      return newState;
    },
  },
});

export const { setPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
