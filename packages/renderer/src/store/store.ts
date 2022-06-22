import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './settingsSlice';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    settings: settingsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
