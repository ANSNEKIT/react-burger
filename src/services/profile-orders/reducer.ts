import { EWebsocketStatus } from '@/types/enums';
import { createSlice } from '@reduxjs/toolkit';

import { loadOrder, onClose, onConnecting, onError, onMessage, onOpen } from './actions';

import type { TAllOrders, TOrderDTO } from '@/contracts/orderDTO';
import type { TOrderResponseBody } from '@/types/transport';
import type { TPayloadAction } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TProfileOrdersState = {
  orders: TOrderDTO[];
  currentOrder: TOrderDTO | null;
  status: EWebsocketStatus;
  error: string | null;
  isLoading: boolean;
};

const initialState: TProfileOrdersState = {
  orders: [],
  currentOrder: null,
  status: EWebsocketStatus.DISCONNECT,
  error: null,
  isLoading: false,
};

export const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    setCurrentOrder(state, action: PayloadAction<string>) {
      const feed = state.orders.find((feed) => feed.number === +action.payload);
      if (feed) {
        state.currentOrder = feed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onConnecting, (state) => {
        state.status = EWebsocketStatus.CONNECTING;
      })
      .addCase(onOpen, (state) => {
        state.status = EWebsocketStatus.ONLINE;
      })
      .addCase(onError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onClose, (state) => {
        state.status = EWebsocketStatus.OFFLINE;
        state.currentOrder = null;
      })
      .addCase(onMessage, (state, action: TPayloadAction<TAllOrders>) => {
        const validFeeds = action.payload.orders.filter(Boolean);
        state.orders = validFeeds;
      })
      .addCase(loadOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadOrder.fulfilled,
        (state, action: PayloadAction<TOrderResponseBody>) => {
          state.currentOrder = Array.isArray(action.payload.orders)
            ? action.payload.orders[0]
            : null;
          state.isLoading = false;
        }
      )
      .addCase(loadOrder.rejected, (state) => {
        state.currentOrder = null;
        state.isLoading = false;
      });
  },
});

export const { setCurrentOrder } = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
