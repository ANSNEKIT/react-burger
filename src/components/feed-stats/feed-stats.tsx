import { EOrderStatus } from '@/types/enums';
import { useMemo, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import type { TOrderDTO } from '@/contracts/orderDTO';

import styles from './feed-stats.module.css';

type TFeedStatsProps = {
  feeds: TOrderDTO[];
};

const FeedStats = ({ feeds }: TFeedStatsProps): ReactElement => {
  const location = useLocation();

  const successFeeds = useMemo(
    () => feeds.filter((feed) => feed.status === EOrderStatus.done),
    [feeds]
  );
  const successFeedsOne = useMemo(() => successFeeds.slice(0, 10), [successFeeds]);
  const successFeedsTwo = useMemo(() => successFeeds.slice(10, 19), [successFeeds]);
  const waitingFeeds = useMemo(
    () => feeds.filter((feed) => feed.status !== EOrderStatus.done),
    [feeds]
  );
  const waitingFeedsOne = useMemo(() => waitingFeeds.slice(0, 10), [waitingFeeds]);
  const waitingFeedsTwo = useMemo(() => waitingFeeds.slice(10, 19), [waitingFeeds]);

  return (
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
                  <div className="text text_type_digits-default mb-2">{feed.number}</div>
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
                  <div className="text text_type_digits-default mb-2">{feed.number}</div>
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
                <div key={feed.number} className="text text_type_digits-default mb-2">
                  {feed.number}
                </div>
              ))}
            </div>

            {/* В работе 2 колонка */}
            <div>
              {waitingFeedsTwo.map((feed) => (
                <div key={feed.number} className="text text_type_digits-default mb-2">
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
  );
};

export default FeedStats;
