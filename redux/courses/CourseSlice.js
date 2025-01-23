import { createSelector, createSlice } from "@reduxjs/toolkit";
import { deleteCourseByIdThunk, deleteLessonItemThunk, fetchCurrentCourseSummaryThunk, getAcademyCoursesThunk } from "./CourseThunk";


const initialState = {
  courseState: [],
  courseSummary: null,
  isDisabled: true,
  isLoading: false,
  isCreateCourseLoading: false,
  isError: false,
  latestLesson: null,
  academyCourses: [],
};

const CourseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.isDisabled = false;
    },
    setLoadingForCreateCourse: (state, action) => {
      state.isCreateCourseLoading = action.payload;
    },
    updateLatestLesson: (state, action) => {
      const { chapterId, lessonId } = action.payload;

      if (!state.courseSummary || !state.courseSummary.chapters) {
        console.warn("Course summary or chapters not found.");
        return;
      }

      const chapter = state.courseSummary.chapters.find((ch) => ch.id === chapterId);

      if (!chapter) {
        console.warn(`Chapter with ID ${chapterId} not found.`);
        state.latestLesson = null;
        return;
      }

      const lesson = chapter.lessons?.find((l) => l.id === lessonId);

      if (!lesson) {
        console.warn(`Lesson with ID ${lessonId} not found in chapter ${chapterId}.`);
        state.latestLesson = null;
        return;
      }

      state.latestLesson = lesson;
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
      }).addCase(deleteLessonItemThunk.fulfilled, (state, action) => {
        console.log("deleteLessonItemThunk.fulfilled");
        const { response, chapterId, itemId, lessonId, type } = action.payload;

        if (response.success) {
          const chapterIndex = state.courseSummary?.chapters.findIndex(
            (ch) => ch.id === chapterId
          );

          if (chapterIndex >= 0) {
            // Create a new copy of the chapter
            const updatedChapter = {
              ...state.courseSummary.chapters[chapterIndex],
              lessons: state.courseSummary.chapters[chapterIndex].lessons.map((lesson) =>
                lesson.id === lessonId && lesson.type === type
                  ? {
                    ...lesson,
                    [type]: lesson[type].filter((item) => item.id !== itemId),
                  }
                  : lesson
              ),
            };
            state.courseSummary = {
              ...state.courseSummary,
              chapters: [
                ...state.courseSummary.chapters.slice(0, chapterIndex),
                updatedChapter,
                ...state.courseSummary.chapters.slice(chapterIndex + 1),
              ],
            };
          }
        }
      }).addCase(getAcademyCoursesThunk.fulfilled, (state, action) => {
        state.academyCourses = action.payload
      }).addCase(deleteCourseByIdThunk.fulfilled, (state, action) => {
        const { response, courseId } = action.payload;
        if (response?.success) {
          state.academyCourses = state.academyCourses.filter(
            (course) => course.id !== courseId
          );
        }
      })
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


export const { changeState, setLoadingForCreateCourse, deleteCourseItem, updateLatestLesson } = CourseSlice.actions;
export default CourseSlice.reducer;
