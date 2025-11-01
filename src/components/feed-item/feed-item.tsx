import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import IngredientPreview from '../ingredient-preview/ingredient-preview';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './feed-item.module.css';

type TFeedItemProps = {
  ingredients: TIngredientDTO[];
};

const FeedItem = ({ ingredients }: TFeedItemProps): ReactElement => {
  return (
    <div className={styles.feed}>
      <div className={styles.header}>
        <h3 className="text text_type_digits-default">#034535</h3>
        <FormattedDate className={styles.createdDate} date={new Date()} />
      </div>
      <h2 className="text text_type_main-medium">Death Star Starship Main бургер</h2>
      <div className={styles.feedPreviewBlock}>
        <div className={styles.feedPreview}>
          <IngredientPreview ingredients={ingredients} />
        </div>
        <div className={`${styles.price} text text_type_digits-default`}>
          480
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
