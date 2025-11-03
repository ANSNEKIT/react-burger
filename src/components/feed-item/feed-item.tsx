import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import IngredientPreview from '../ingredient-preview/ingredient-preview';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './feed-item.module.css';

type TFeedItemProps = {
  itemId: string;
  ingredients: TIngredientDTO[];
};

const FeedItem = ({ ingredients, itemId }: TFeedItemProps): ReactElement => {
  return (
    <Link to={`/feed/${itemId}`} className={styles.feed}>
      <div className={styles.feedWrap}>
        <div className={styles.header}>
          <h3 className="text text_type_digits-default">#034535</h3>
          <FormattedDate className={styles.createdDate} date={new Date()} />
        </div>
        <h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
        <div className={styles.feedPreviewBlock}>
          <div className={styles.feedPreview}>
            <IngredientPreview ingredients={ingredients} />
          </div>
          <div className={`${styles.price} text text_type_digits-default nowrap`}>
            480
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;
