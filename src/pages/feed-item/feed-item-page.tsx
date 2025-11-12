import { Loader, OrderItem } from '@/components';
import { getGlobalOrder } from '@/services/common/selectors';
import { loadFeed } from '@/services/feed/actions';
import { getFeedSlice } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { convertIdsToIngredients } from '@/utils/convert-ids-to-ingredients';
import { convertToQniqIngredients } from '@/utils/convert-to-qniq-ingredients';
import { useEffect, useMemo, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

const FeedItem = (): ReactElement => {
  const { feedNumber } = useParams<string>();
  const dispatch = useAppDispatch();
  const { mapIngredients } = useAppSelector(getIngredientsState);
  const { isLoading, error } = useAppSelector(getFeedSlice);
  const orderByAllSlice = useAppSelector((state) => getGlobalOrder(state, feedNumber!));

  const orderQniqIngredients = useMemo(() => {
    if (!orderByAllSlice) {
      return [];
    }
    const mappedIngredients = new Map(mapIngredients);
    const orderIngs = convertIdsToIngredients(
      orderByAllSlice.ingredients,
      mappedIngredients
    );
    const qniqOrderIngs = convertToQniqIngredients(orderIngs);
    return qniqOrderIngs;
  }, [orderByAllSlice, mapIngredients]);

  useEffect(() => {
    if (!orderByAllSlice && feedNumber) {
      void dispatch(loadIngredients());
      void dispatch(loadFeed({ orderId: feedNumber }));
    }
  }, []);

  console.log('feedItem >> feed', orderByAllSlice);

  return (
    <div className="page pageCenter">
      {isLoading && !error && <Loader size="large" />}

      {!isLoading && error && (
        <div className="text-center text text_type_digits-default">Oшибка: {error}</div>
      )}

      {!isLoading && !error && !orderByAllSlice && (
        <div className="text-center text text_type_digits-default">Заказ не найден</div>
      )}

      {orderByAllSlice && (
        <OrderItem item={orderByAllSlice} itemIngredients={orderQniqIngredients} />
      )}
    </div>
  );
};

export default FeedItem;
