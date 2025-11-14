import { Feed } from '@/components';
import { connect, disconnect } from '@/services/feed/actions';
import { getFeedSlice } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { getMapIngredints } from '@/services/ingredients/selectors';
import { EWebsocketStatus } from '@/types/enums';
import { useEffect, useMemo, type ReactElement } from 'react';

import styles from './feed-page.module.css';

const FeedPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { status, feeds, error } = useAppSelector(getFeedSlice);
  const mapIngredients = useAppSelector(getMapIngredints);

  const mappedIngredients = useMemo(() => new Map(mapIngredients), [mapIngredients]);
  const isLoading = useMemo(
    () =>
      status === EWebsocketStatus.CONNECTING ||
      (status === EWebsocketStatus.OFFLINE && !error),
    [status, error]
  );

  useEffect(() => {
    void dispatch(connect('wss://norma.education-services.ru/orders/all'));

    return (): void => void dispatch(disconnect());
  }, []);

  return (
    <div className={styles.feedPage}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>Лента заказов</h1>

      <Feed
        feeds={feeds}
        mapIngredients={mappedIngredients}
        isLoading={isLoading}
        error={error}
        isShowStats
      />
    </div>
  );
};

export default FeedPage;
