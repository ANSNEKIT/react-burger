import type { RootState } from '../store';
import type { TOrderDTO } from '@/contracts/orderDTO';

export const getGlobalOrder = (
  store: RootState,
  orderNumber: string
): TOrderDTO | null => {
  const backetOrder = store.basketSlice.order;
  const feedOrderInOrders =
    store.feedSlice.feeds.find((feed) => feed.number.toString() === orderNumber) ?? null;
  const feedCurrentFeed = store.feedSlice.currentFeed;

  // TODO дописать как будет создан profileFeedSlice
  const profileOrder = null; // store.profileFeedSlice.currentOrder

  return backetOrder ?? feedCurrentFeed ?? feedOrderInOrders ?? profileOrder;
};
