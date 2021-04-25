import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import eventSlice from "../features/event/eventSlice";
import peopleSlice from "../features/people/peopleSlice";

export default configureStore({
  reducer: {
    event: eventSlice,
    auth: authSlice,
    people: peopleSlice,
  },
});
