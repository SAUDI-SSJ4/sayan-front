import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice.js";
import AcademyAuthReducer from "./AcademyAuthSlics.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    academyUser: AcademyAuthReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
