import { EWebsocketStatus } from '@/types/enums';
import { createSlice } from '@reduxjs/toolkit';

import { onConnecting, onClose, onError, onMessage, onOpen } from './actions';

import type { TAllOrders, TOrderDTO } from '@/contracts/orderDTO';
import type { TPayloadAction } from '@/types/types';

export type TFeedState = {
  feeds: TOrderDTO[];
  status: EWebsocketStatus;
  error: string | null;
};

const initialState: TFeedState = {
  feeds: [],
  status: EWebsocketStatus.OFFLINE,
  error: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
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
      })
      .addCase(onMessage, (state, action: TPayloadAction<TAllOrders>) => {
        state.feeds = action.payload.orders;
      });
  },
});

export default feedSlice.reducer;
