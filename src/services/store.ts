import { combineSlices, configureStore } from '@reduxjs/toolkit';

import basketSlice from './basket/reducer';
import ingredientsSlice from './ingredients/reducer';

const rootReducer = combineSlices({ ingredientsSlice, basketSlice });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
