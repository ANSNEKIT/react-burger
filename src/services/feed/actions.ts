import { createAction } from '@reduxjs/toolkit';

import type { TAllOrders } from '@/contracts/orderDTO';

export const connect = createAction<string, 'feed/connect'>('feed/connect');
export const disconnect = createAction('feed/disconnect');

export const onConnecting = createAction('feed/onconnecting');
export const onOpen = createAction('feed/onopen');
export const onMessage = createAction<TAllOrders, 'feed/onmessage'>('feed/onmessage');
export const onError = createAction<string, 'feed/onerror'>('feed/onerror');
export const onClose = createAction('feed/onclose');

export type FeedActionTypes =
  | ReturnType<typeof connect>
  | ReturnType<typeof disconnect>
  | ReturnType<typeof onConnecting>
  | ReturnType<typeof onOpen>
  | ReturnType<typeof onMessage>
  | ReturnType<typeof onError>
  | ReturnType<typeof onClose>;
