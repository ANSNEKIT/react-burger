import type { RootState } from '../store';
import type { TProfileOrdersState } from './reducer';
import type { TOrderDTO } from '@/contracts/orderDTO';

export const getProfileOrdersSlice = (store: RootState): TProfileOrdersState =>
  store.profileOrdersSlice;

export const getOrders = (store: RootState): TOrderDTO[] =>
  store.profileOrdersSlice.orders;

export const getCurrentOrder = (store: RootState): TOrderDTO | null =>
  store.profileOrdersSlice.currentOrder;
