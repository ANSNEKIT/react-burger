import { FeedItem, Loader } from '@/components';
import { connect, disconnect } from '@/services/feed/actions';
import { getFeedSlice } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState, getMapIngredints } from '@/services/ingredients/selectors';
import { EWebsocketStatus } from '@/types/enums';
import { useEffect, useMemo, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

import styles from './feed.module.css';

const headerHeight = 56;
const titleHeight = 40;

const Feed = (): ReactElement => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { ingredients, isLoading: isLoadingIngs } = useAppSelector(getIngredientsState);
  const { status, feeds, error } = useAppSelector(getFeedSlice);
  const mapIngredients = useAppSelector(getMapIngredints);
  const mappedIngredients = useMemo(() => new Map(mapIngredients), [mapIngredients]);
  const isLoading = useMemo(() => status === EWebsocketStatus.CONNECTING, [status]);
  const successFeeds = useMemo(
    () => feeds.filter((feed) => feed.status === 'done'),
    [feeds]
  );
  const successFeedsOne = useMemo(() => successFeeds.slice(0, 10), [successFeeds]);
  const successFeedsTwo = useMemo(() => successFeeds.slice(10, 19), [successFeeds]);
  const waitingFeeds = useMemo(
    () => feeds.filter((feed) => feed.status !== 'done'),
    [feeds]
  );
  const waitingFeedsOne = useMemo(() => waitingFeeds.slice(0, 10), [waitingFeeds]);
  const waitingFeedsTwo = useMemo(() => waitingFeeds.slice(10, 19), [waitingFeeds]);

  const formattedIngredients = (ids: string[]): TIngredientDTO[] => {
    return ids
      .map((id) => mappedIngredients.get(id))
      .filter(Boolean) as TIngredientDTO[];
  };

  useEffect(() => {
    if (!isLoadingIngs && ingredients.length === 0) {
      void dispatch(loadIngredients()).then(() => {
        void dispatch(connect('wss://norma.education-services.ru/orders/all'));
      });
    } else {
      void dispatch(connect('wss://norma.education-services.ru/orders/all'));
    }

    return (): void => void dispatch(disconnect());
  }, []);

  const feedsStyle: React.CSSProperties = {
    height: `calc(100vh - 150px - ${headerHeight}px - ${titleHeight}px)`,
  };

  return (
    <div className={styles.feedPage}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>Лента заказов</h1>

      <div className={styles.feedWrap}>
        {isLoading && <Loader size="large" />}

        {!isLoading && error && (
          <h2 className="text text_type_main-large">Ошибка: {error}</h2>
        )}

        <div className={styles.feeds} style={feedsStyle}>
          {!isLoading &&
            !error &&
            feeds.length > 0 &&
            feeds.map((feed, index) => (
              <FeedItem
                key={index}
                feed={feed}
                ingredients={formattedIngredients(feed.ingredients)}
              />
            ))}
        </div>
        <div className={styles.stat}>
          {/* Списки заказов */}
          <div className={`${styles.statOrders} mb-15`}>
            <div className={styles.statOrdersBlock}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <div className={styles.statColumnsWrap}>
                {/* Готовы 1 колонка */}
                <div>
                  {successFeedsOne.map((feed) => (
                    <Link
                      key={feed.number}
                      to={`/feed/${feed.number}`}
                      state={{ background: location.pathname }}
                      className={`${styles.orderLink} mb-2`}
                    >
                      <div className="text text_type_digits-default mb-2">
                        {feed.number}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Готовы 2 колонка */}
                <div>
                  {successFeedsTwo.map((feed) => (
                    <Link
                      key={feed.number}
                      to={`/feed/${feed.number}`}
                      state={{ background: location.pathname }}
                      className={`${styles.orderLink} mb-2`}
                    >
                      <div className="text text_type_digits-default mb-2">
                        {feed.number}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.statOrdersBlock}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <div className={styles.statColumnsWrap}>
                {/* В работе 1 колонка */}
                <div>
                  {waitingFeedsOne.map((feed) => (
                    <div
                      key={feed.number}
                      className="text text_type_digits-default mb-2"
                    >
                      {feed.number}
                    </div>
                  ))}
                </div>

                {/* В работе 2 колонка */}
                <div>
                  {waitingFeedsTwo.map((feed) => (
                    <div
                      key={feed.number}
                      className="text text_type_digits-default mb-2"
                    >
                      {feed.number}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Выполнено за все время */}
          <div className="mb-15">
            <h3 className="text text_type_main-medium mb-6">Выполнено за все время:</h3>
            <p className="text text_type_digits-large">28000</p>
          </div>

          {/* Выполнено за сегодня */}
          <div className="mb-15">
            <h3 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h3>
            <p className="text text_type_digits-large">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
