import { Loader, OrderItem } from '@/components';
import { getGlobalOrder } from '@/services/common/selectors';
import { loadFeed } from '@/services/feed/actions';
import { getFeedSlice } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useEffect, useState, type ReactElement } from 'react';
import { useParams } from 'react-router-dom';

const FeedItem = (): ReactElement => {
  const { feedNumber } = useParams<string>();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(getFeedSlice);
  const order = useAppSelector(getGlobalOrder);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (order || error) {
      setIsLoading(false);
    }
  }, [order, error]);

  useEffect(() => {
    if (!order && feedNumber) {
      void dispatch(loadFeed({ orderId: feedNumber }));
    }
  }, []);

  return (
    <div className="page pageCenter">
      {isLoading && !error && (
        <div className="d-flex flex-column w-100">
          <h2 className="text-center text text_type_digits-default mb-10">
            #{feedNumber}
          </h2>
          <Loader size="large" />
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center text text_type_digits-default">Oшибка: {error}</div>
      )}

      {!isLoading && !error && !order && (
        <div className="text-center text text_type_digits-default">Заказ не найден</div>
      )}

      {order && feedNumber && (
        <>
          <h2 className="text-center text text_type_digits-default mb-10">
            #{feedNumber}
          </h2>
          <OrderItem />
        </>
      )}
    </div>
  );
};

export default FeedItem;
