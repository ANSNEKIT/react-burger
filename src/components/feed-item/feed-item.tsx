import { setCurrentFeed } from '@/services/feed/reducer';
import { useAppDispatch } from '@/services/hooks';
import { setCurrentOrder } from '@/services/profile-orders/reducer';
import { EOrderStatus, EOrderStatusTitles } from '@/types/enums';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import IngredientPreview from '../ingredient-preview/ingredient-preview';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrderDTO } from '@/contracts/orderDTO';
import type { TLocationState } from '@/types/types';

import styles from './feed-item.module.css';

type TFeedItemProps = {
  feed: TOrderDTO;
  ingredients: TIngredientDTO[];
};

const FeedItem = ({ ingredients, feed }: TFeedItemProps): ReactElement => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const isOrderItem = pathname === '/profile/orders';
  const statusDone = feed.status === EOrderStatus.done ? styles.feedStatusDone : '';
  const linkState: TLocationState = {
    background: { pathname, param: feed.number.toString() },
  };

  const feedPrice = useMemo(
    () => ingredients.reduce((acc, ing) => acc + ing.price, 0),
    [ingredients]
  );

  const onClickLink = (): void => {
    if (!isOrderItem) {
      void dispatch(setCurrentFeed(feed.number.toString()));
    } else {
      void dispatch(setCurrentOrder(feed.number.toString()));
    }
  };

  return (
    <Link
      to={`${pathname}/${feed.number}`}
      state={linkState}
      className={styles.feed}
      onClick={onClickLink}
    >
      <div className={styles.feedWrap}>
        <div className={styles.header}>
          <h3 className="text text_type_digits-default">#{feed.number}</h3>
          <FormattedDate
            className={styles.createdDate}
            date={new Date(feed.createdAt)}
          />
        </div>

        <div>
          <h2 className="text text_type_main-medium mb-2">{feed.name}</h2>
          <p className={`text text_type_main-default ${statusDone}`}>
            {EOrderStatusTitles[feed.status]}
          </p>
        </div>

        <div className={styles.feedPreviewBlock}>
          <div className={styles.feedPreview}>
            <IngredientPreview ingredients={ingredients} />
          </div>
          <div className={`${styles.price} text text_type_digits-default nowrap`}>
            {feedPrice}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;
