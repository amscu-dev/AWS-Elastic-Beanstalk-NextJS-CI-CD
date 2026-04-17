import { configureStore } from "@reduxjs/toolkit";

import modalStateReducer from "@/store/slices/modal-state-slice";

const store = configureStore({
  reducer: {
    modal: modalStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = AppStore["dispatch"];
// Get the type of our store variable
type AppStore = typeof store;

export type { AppDispatch, RootState, AppStore };
export { store };
