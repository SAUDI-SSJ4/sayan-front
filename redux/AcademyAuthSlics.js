import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  academy: null,
};

const AcademyAuthSlics = createSlice({
  name: "AcademyAuthSlics",
  initialState,
  reducers: {
    setAcademyUser: (state, action) => {
      state.academy = action.payload;
    },
  },
});

export const { setAcademyUser } = AcademyAuthSlics.actions;
export default AcademyAuthSlics.reducer;
