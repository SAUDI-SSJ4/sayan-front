import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteCourseById,
  deleteLessonItem,
  getCourse,
  getCourseSummary,
} from "../../src/utils/apis/client/academy";

export const fetchCurrentCourseSummaryThunk = createAsyncThunk(
  "current/course/Summary/fetch",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await getCourseSummary(courseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch trainers"
      );
    }
  }
);

export const deleteLessonItemThunk = createAsyncThunk(
  "Lesson/deleteLessonItem",
  async ({ chapterId, lessonId, type, itemId }, { rejectWithValue }) => {
    try {
      const response = await deleteLessonItem(lessonId, {
        itemId: itemId,
        type: type,
      });
      return { chapterId, lessonId, type, itemId, response: response };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch trainers"
      );
    }
  }
);

export const getAcademyCoursesThunk = createAsyncThunk(
  "fetchCourses/getAcademyCourses",
  async (academy_id, { rejectWithValue }) => {
    try {
      console.log("Fetching courses for academy:", academy_id);
      const response = await getCourse(academy_id);
      console.log("API Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching courses:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch courses");
    }
  }
);

export const deleteCourseByIdThunk = createAsyncThunk(
  "deleteCourses/deleteCourseById",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await deleteCourseById(courseId);
      return { response: response, courseId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while deleting the course"
      );
    }
  }
);
