import { combineSlices, configureStore } from '@reduxjs/toolkit';

import basketSlice from './basket/reducer';
import ingredientsSlice from './ingredients/reducer';
import userSlice from './user/reducer';

const rootReducer = combineSlices({ ingredientsSlice, basketSlice, userSlice });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
