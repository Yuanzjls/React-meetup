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
