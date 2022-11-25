import { configureStore } from "@reduxjs/toolkit";
import recordsReducer from "./recordsSlice";
import dbReducer from "./dbSlice";

export const store = configureStore({
  reducer: {
    db: dbReducer,
    records: recordsReducer,
  },
});
