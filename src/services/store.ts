import {
  connect,
  onConnecting,
  disconnect,
  onClose,
  onError,
  onMessage,
  onOpen,
} from '@/services/feed/actions';
import {
  connect as orderConnect,
  onConnecting as onOrderConnecting,
  disconnect as onOrderDisconnect,
  onClose as onOrderClose,
  onError as onOrderError,
  onOpen as onOrderOpen,
  onMessage as onOrderMessage,
} from '@/services/profile-orders/actions';
import { combineSlices, configureStore } from '@reduxjs/toolkit';

import basketSlice from './basket/reducer';
import feedSlice from './feed/reducer';
import ingredientsSlice from './ingredients/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import profileOrdersSlice from './profile-orders/reducer';
import userSlice from './user/reducer';

import type { TAllOrders } from '@/contracts/orderDTO';

const rootReducer = combineSlices({
  ingredientsSlice,
  basketSlice,
  userSlice,
  feedSlice,
  profileOrdersSlice,
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
const isWithTokenRefresh = true;
const profileOrdersSocketMiddleware = socketMiddleware<TAllOrders, void>(
  {
    connect: orderConnect,
    onConnecting: onOrderConnecting,
    disconnect: onOrderDisconnect,
    onClose: onOrderClose,
    onError: onOrderError,
    onMessage: onOrderMessage,
    onOpen: onOrderOpen,
  },
  isWithTokenRefresh
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      profileOrdersSocketMiddleware,
      feedSocketMiddleware
    );
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
