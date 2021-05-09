import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/authSlice";
import eventSlice from "../features/event/eventSlice";

export default configureStore({
  reducer: {
    event: eventSlice,
    auth: authSlice,
  },
});
