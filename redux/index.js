import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice.js";
import AcademyAuthReducer from "./AcademyAuthSlics.js";
import CourseReducer from "./CourseSlice.js";
import CategoryReducer from "./CategorySlice.js";
import TrainerReducer from "./TrainerSlice.js";
import CourseSidebarReducer from "./CourseSidebarSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    academyUser: AcademyAuthReducer,
    course: CourseReducer,
    categories: CategoryReducer,
    trainers: TrainerReducer,
    courseSidebarSlice: CourseSidebarReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
