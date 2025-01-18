import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTrainer } from "../src/utils/apis/client/academy";

export const fetchTrainerThunk = createAsyncThunk(
  "trainer/fetchTrainer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTrainer();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch trainers");
    }
  }
);


const initialState = {
  trainers: null,
  isLoading: false,
  error: null,
};

const TrainerSlice = createSlice({
  name: "TrainerSlice",
  initialState,
  reducers: {
    setTrainer: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainerThunk.fulfilled, (state, action) => {
        state.trainers = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTrainerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setTrainer } = TrainerSlice.actions;
export default TrainerSlice.reducer;
