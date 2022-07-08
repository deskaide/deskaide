import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import settingsReducer from './settingsSlice';
import timerReducer from './timerSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  timer: timerReducer,
  settings: settingsReducer,
});

const syncConfig = {
  // TOGGLE_TODO will not be triggered in other tabs
  blacklist: ['TOGGLE_TODO'],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createStateSyncMiddleware(syncConfig)),
});

export const persistor = persistStore(store);

initMessageListener(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
