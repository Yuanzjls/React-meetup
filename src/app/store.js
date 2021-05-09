import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "../features/event/eventSlice";

export default configureStore({
  reducer: {
    event: eventSlice,
  },
});
