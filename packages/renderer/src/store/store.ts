import { configureStore, combineReducers } from '@reduxjs/toolkit';

import settingsReducer from './settingsSlice';
import timerReducer from './timerSlice';
import diaryReducer from './diarySlice';
import noteReducer from './noteSlice';

const rootReducer = combineReducers({
  timer: timerReducer,
  settings: settingsReducer,
  diary: diaryReducer,
  notes: noteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
