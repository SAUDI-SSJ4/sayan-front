import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getCourseSummary } from "../src/utils/apis/client/academy";


export const fetchCurrentCourseSummaryThunk = createAsyncThunk(
  "current/course/Summary/fetch",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getCourseSummary(courseId);
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch trainers");
    }
  }
);


const initialState = {
  courseState: [],
  courseSummary: null,
  isDisabled: true,
  isLoading: false,
  isError: false,
};

const CourseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.isDisabled = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentCourseSummaryThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCurrentCourseSummaryThunk.fulfilled, (state, action) => {
        state.courseSummary = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentCourseSummaryThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});


const latestCourseSummary = (state) => state.course.courseSummary?.chapters || [];
export const latestLesson = createSelector(
  [latestCourseSummary, (_, chapterId) => chapterId, (_, __, lessonId) => lessonId],
  (chapters, chapterId, lessonId) => {
    const chapter = chapters.find((c) => c.id === parseInt(chapterId));
    return chapter?.lessons?.find((l) => l.id === lessonId) || null;
  }
)

export const { changeState } = CourseSlice.actions;
export default CourseSlice.reducer;
