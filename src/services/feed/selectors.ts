import type { RootState } from '../store';
import type { TFeedState } from './reducer';
import type { TOrderDTO } from '@/contracts/orderDTO';

export const getFeedSlice = (store: RootState): TFeedState => store.feedSlice;

export const getFeeds = (store: RootState): TOrderDTO[] => store.feedSlice.feeds;

export const getCurrentFeed = (store: RootState): TOrderDTO | null =>
  store.feedSlice.currentFeed;
