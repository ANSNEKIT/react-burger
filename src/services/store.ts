import { combineSlices, configureStore } from '@reduxjs/toolkit';

import ingredientsSlice from './ingredients/reducer';

const rootReducer = combineSlices({ ingredientsSlice });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
