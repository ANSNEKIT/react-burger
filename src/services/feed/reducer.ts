import { EWebsocketStatus } from '@/types/enums';
import { createSlice } from '@reduxjs/toolkit';

import { onConnecting, onClose, onError, onMessage, onOpen, loadFeed } from './actions';

import type { TAllOrders, TOrderDTO } from '@/contracts/orderDTO';
import type { TOrderResponseBody } from '@/types/transport';
import type { TPayloadAction } from '@/types/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TFeedState = {
  feeds: TOrderDTO[];
  currentFeed: TOrderDTO | null;
  status: EWebsocketStatus;
  error: string | null;
  isLoading: boolean;
};

const initialState: TFeedState = {
  feeds: [],
  currentFeed: null,
  status: EWebsocketStatus.OFFLINE,
  error: null,
  isLoading: false,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setCurrentFeed(state, action: PayloadAction<string>) {
      const feed = state.feeds.find((feed) => feed.number.toString() === action.payload);
      if (feed) {
        state.currentFeed = feed;
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
        state.feeds = [];
      })
      .addCase(onMessage, (state, action: TPayloadAction<TAllOrders>) => {
        const validFeeds = action.payload.orders.filter(Boolean);
        state.feeds = validFeeds;
      })
      .addCase(loadFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loadFeed.fulfilled,
        (state, action: PayloadAction<TOrderResponseBody>) => {
          state.currentFeed = Array.isArray(action.payload.orders)
            ? action.payload.orders[0]
            : null;
          state.isLoading = false;
        }
      )
      .addCase(loadFeed.rejected, (state) => {
        state.currentFeed = null;
        state.isLoading = false;
      });
  },
});

export const { setCurrentFeed } = feedSlice.actions;

export default feedSlice.reducer;
