import { combineSlices, configureStore } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-named-as-default
import ingredientsSlice from './ingredients/reducer';

const rootReducer = combineSlices({ ingredientsSlice });

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
