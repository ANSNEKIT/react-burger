import { FeedItem, FeedStats, Loader } from '@/components';
import { connect, disconnect } from '@/services/feed/actions';
import { getFeedSlice } from '@/services/feed/selectors';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState, getMapIngredints } from '@/services/ingredients/selectors';
import { EWebsocketStatus } from '@/types/enums';
import { convertIdsToIngredients } from '@/utils/convert-ids-to-ingredients';
import { useEffect, useMemo, type ReactElement } from 'react';

import styles from './feed.module.css';

const headerHeight = 56;
const titleHeight = 40;

const Feed = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { ingredients, isLoading: isLoadingIngs } = useAppSelector(getIngredientsState);
  const { status, feeds, error } = useAppSelector(getFeedSlice);
  const mapIngredients = useAppSelector(getMapIngredints);

  const mappedIngredients = useMemo(() => new Map(mapIngredients), [mapIngredients]);
  const isLoading = useMemo(() => status === EWebsocketStatus.CONNECTING, [status]);

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
                ingredients={convertIdsToIngredients(
                  feed.ingredients,
                  mappedIngredients
                )}
              />
            ))}
        </div>
        <FeedStats feeds={feeds} />
      </div>
    </div>
  );
};

export default Feed;
