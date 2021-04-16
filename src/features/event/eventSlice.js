import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { format } from "../constants/DateFormat";
export const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: null,
    date: moment().format(format),
    filterByDateEnable: false,
    eventDetail: null,
  },
  reducers: {
    setEvents: (state, action) => {
      const newState = { ...state };
      newState.events = action.payload;
      return newState;
    },
    setDate: (state, action) => {
      const newState = { ...state };
      newState.date = action.payload;
      return newState;
    },
    setFilterByDateEnable: (state, action) => {
      const newState = { ...state };
      newState.filterByDateEnable = action.payload;
      return newState;
    },
    setEventDetail: (state, action) => {
      const newState = { ...state };
      newState.eventDetail = action.payload;
      return newState;
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
