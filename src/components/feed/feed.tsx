import { convertIdsToIngredients } from '@/utils/convert-ids-to-ingredients';

import FeedItem from '../feed-item/feed-item';
import FeedStats from '../feed-stats/feed-stats';
import Loader from '../loader/loader';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrderDTO } from '@/contracts/orderDTO';
import type { ReactElement } from 'react';

import styles from './feed.module.css';

type TFeedProps = {
  feeds: TOrderDTO[];
  mapIngredients: Map<string, TIngredientDTO>;
  isLoading: boolean;
  error: string | null;
  isShowStats?: boolean;
};

const headerHeight = 56;
const titleHeight = 40;

const feed = ({
  feeds,
  mapIngredients,
  isLoading,
  error,
  isShowStats,
}: TFeedProps): ReactElement => {
  const feedsStyle: React.CSSProperties = {
    height: `calc(100vh - 150px - ${headerHeight}px - ${titleHeight}px)`,
  };

  return (
    <div className={styles.feedWrap}>
      {isLoading && (
        <div className="page pageCenter">
          <Loader size="large" />
        </div>
      )}

      {!isLoading && error && <h2 className="text text_type_main-large">Ошибка</h2>}

      {!isLoading && !error && feeds.length === 0 && (
        <div className={styles.feeds} style={feedsStyle}>
          <h2 className="text text_type_main-large">Нет заказов</h2>
        </div>
      )}

      {!isLoading && !error && feeds.length > 0 && (
        <div className={styles.feeds} style={feedsStyle}>
          {feeds.map((feed) => (
            <FeedItem
              key={feed._id}
              feed={feed}
              ingredients={convertIdsToIngredients(feed.ingredients, mapIngredients)}
            />
          ))}
        </div>
      )}
      {!isLoading && !error && isShowStats && <FeedStats feeds={feeds} />}
    </div>
  );
};

export default feed;
