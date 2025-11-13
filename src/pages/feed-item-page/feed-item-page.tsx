import { Loader, OrderItem } from '@/components';
import { getGlobalOrder } from '@/services/common/selectors';
import { loadFeed } from '@/services/feed/actions';
import { getFeedSlice } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { useEffect, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

const FeedItem = (): ReactElement => {
  const { feedNumber } = useParams<string>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getFeedSlice);
  const orderByAllSlice = useAppSelector((state) => getGlobalOrder(state, feedNumber!));

  useEffect(() => {
    if (!orderByAllSlice && feedNumber) {
      void dispatch(loadIngredients());
      void dispatch(loadFeed({ orderId: feedNumber }));
    }
  }, []);

  return (
    <div className="page pageCenter">
      {isLoading && !error && <Loader size="large" />}

      {!isLoading && error && (
        <div className="text-center text text_type_digits-default">Oшибка: {error}</div>
      )}

      {!isLoading && !error && !orderByAllSlice && (
        <div className="text-center text text_type_digits-default">Заказ не найден</div>
      )}

      {orderByAllSlice && feedNumber && (
        <>
          <h2 className="text-center text text_type_digits-default mb-10">
            #{feedNumber}
          </h2>
          <OrderItem number={feedNumber} />
        </>
      )}
    </div>
  );
};

export default FeedItem;
