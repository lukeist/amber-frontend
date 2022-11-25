import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: [] };

export const dbSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    pushDb: (state, action) => {
      state.data = action.payload.map((data) => data);
    },
  },
});

export const { pushDb } = dbSlice.actions;
export default dbSlice.reducer;
