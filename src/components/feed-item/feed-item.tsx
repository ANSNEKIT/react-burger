import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, type ReactElement } from 'react';
import { Link } from 'react-router-dom';

import IngredientPreview from '../ingredient-preview/ingredient-preview';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrderDTO } from '@/contracts/orderDTO';

import styles from './feed-item.module.css';

type TFeedItemProps = {
  feed: TOrderDTO;
  ingredients: TIngredientDTO[];
};

const FeedItem = ({ ingredients, feed }: TFeedItemProps): ReactElement => {
  const feedPrice = useMemo(
    () => ingredients.reduce((acc, ing) => acc + ing.price, 0),
    [ingredients]
  );
  return (
    <Link to={`/feed/${feed.number}`} className={styles.feed}>
      <div className={styles.feedWrap}>
        <div className={styles.header}>
          <h3 className="text text_type_digits-default">#{feed.number}</h3>
          <FormattedDate
            className={styles.createdDate}
            date={new Date(feed.createdAt)}
          />
        </div>
        <h2 className="text text_type_main-medium">{feed.name}</h2>
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
