import { configureStore } from "@reduxjs/toolkit";
import { api } from "../features/api/apiSlice";
import draftReducer from "../features/draft/draftSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    isDraft: draftReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
