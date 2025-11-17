import type { RootState } from '../store';
import type { TOrderDTO } from '@/contracts/orderDTO';

export const getGlobalOrder = (store: RootState): TOrderDTO | null => {
  const backetOrder = store.basketSlice.order;
  const feedCurrentFeed = store.feedSlice.currentFeed;
  const profileCurrentOrder = store.profileOrdersSlice.currentOrder;

  return backetOrder ?? feedCurrentFeed ?? profileCurrentOrder;
};
