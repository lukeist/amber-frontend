import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  year: "All",
  chartTitle: "Students by All Courses",
  courses: [],
  instructors: [],
  active: false,
};

export const recordsSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    pushChartTitle: (state, action) => {
      state.chartTitle = action.payload;
    },
    pushChartYear: (state, action) => {
      state.year = action.payload;
    },
    pushCourses: (state, action) => {
      state.courses = action.payload.map((course) => course);
    },
    pushInstructors: (state, action) => {
      state.instructors = action.payload.map((instructor) => instructor);
    },
    active: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const {
  pushChartTitle,
  pushChartYear,
  pushCourses,
  pushInstructors,
  active,
} = recordsSlice.actions;
export default recordsSlice.reducer;
