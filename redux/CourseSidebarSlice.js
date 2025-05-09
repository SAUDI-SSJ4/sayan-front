import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    navigate: "chapter",
    openInteractive: false,
};

const CourseSidebarSlice = createSlice({
    name: "CourseSidebarSlice",
    initialState,
    reducers: {
        changeNavigate: (state, action) => {
            state.navigate = action.payload;
        },
        changeOpenInteractive: (state, action) => {
            state.openInteractive = action.payload;
        },
    },
});

export const { changeNavigate, changeOpenInteractive } = CourseSidebarSlice.actions;
export default CourseSidebarSlice.reducer;
