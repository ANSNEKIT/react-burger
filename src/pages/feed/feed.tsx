import { FeedItem, Loader } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { useEffect, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './feed.module.css';

const headerHeight = 56;
const titleHeight = 40;
const successOrders = ['03110', '03111', '03112', '03113', '03114', '03115'];
const waitingOrders = ['04100', '04101', '04102'];

const Feed = (): ReactElement => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { ingredients, isLoading, error } = useAppSelector(getIngredientsState);

  useEffect(() => {
    if (!isLoading && ingredients.length === 0) {
      void dispatch(loadIngredients());
    }
  }, []);

  const feedsStyle: React.CSSProperties = {
    height: `calc(100vh - 150px - ${headerHeight}px - ${titleHeight}px)`,
  };

  return (
    <div className={styles.feedPage}>
      <h1 className={`mt-10 mb-5 text text_type_main-large`}>Лента заказов</h1>
      <div className={styles.feedWrap}>
        <div className={styles.feeds} style={feedsStyle}>
          {isLoading && <Loader size="large" />}

          {!isLoading && error && (
            <h2 className="text text_type_main-large">Ошибка: {error}</h2>
          )}

          {!isLoading &&
            !error &&
            new Array(20)
              .fill(0)
              .map((_, index) => (
                <FeedItem
                  key={index}
                  itemId={index.toString()}
                  ingredients={ingredients}
                />
              ))}
        </div>
        <div className={styles.stat}>
          {/* Списки заказов */}
          <div className={`${styles.statOrders} mb-15`}>
            <div className={styles.statOrdersBlock}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <div>
                {successOrders.map((orderId) => (
                  <Link
                    key={orderId}
                    to={`/feed/${orderId}`}
                    state={{ background: location.pathname }}
                    className={`${styles.orderLink} mb-2`}
                  >
                    <div className="text text_type_digits-default">{orderId}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.statOrdersBlock}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <div>
                {waitingOrders.map((orderId) => (
                  <div key={orderId} className="text text_type_digits-default mb-2">
                    {orderId}
                  </div>
                ))}
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
