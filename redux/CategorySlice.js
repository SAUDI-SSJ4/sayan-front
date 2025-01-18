import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllcategories } from "../src/utils/apis/client/academy";


export const fetchCategoriesThunk = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllcategories();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch trainers");
    }
  }
);

const initialState = {
  categories: null,
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
