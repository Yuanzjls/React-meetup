import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { format } from "../constants/DateFormat";
export const eventSlice = createSlice({
  name: "auth",
  initialState: {
    authorization: false,
    token: null,
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setFilterByDateEnable: (state, action) => {
      state.filterByDateEnable = action.payload;
    },
    setEventDetail: (state, action) => {
      state.eventDetail = action.payload;
    },
  },
});

export const {
  setEvents,
  setDate,
  setFilterByDateEnable,
  setEventDetail,
} = eventSlice.actions;

export default eventSlice.reducer;
