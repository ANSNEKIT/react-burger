import {
  connect,
  onConnecting,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
} from '@/services/feed/actions';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import basketSlice from './basket/reducer';
import feedSlice from './feed/reducer';
import ingredientsSlice from './ingredients/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import userSlice from './user/reducer';

import type { TAllOrders } from '@/contracts/orderDTO';

const rootReducer = combineSlices({
  ingredientsSlice,
  basketSlice,
  userSlice,
  feedSlice,
});

const feedSocketMiddleware = socketMiddleware<TAllOrders, void>({
  connect,
  onConnecting,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedSocketMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
