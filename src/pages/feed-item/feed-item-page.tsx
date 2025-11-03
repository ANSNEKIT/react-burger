import { IngredientRow } from '@/components';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';

import type { ReactElement } from 'react';

import styles from './feed-item-page.module.css';

const FeedItem = (): ReactElement => {
  return (
    <div className="page pageCenter">
      <div className={`${styles.feedItem}`}>
        <h2 className="text-center text text_type_digits-default mb-10">#034533</h2>

        <div className="mb-15">
          <h1 className="text text_type_main-medium mb-3">
            Black Hole Singularity острый бургер
          </h1>
          <div className={`${styles.orderStatus} text text_type_main-default`}>
            Выполнен
          </div>
        </div>

        <div className={`${styles.feedIngredientsBlock} mb-10`}>
          <h2 className="text text_type_main-medium mb-6">Состав:</h2>
          <div className={styles.feedIngredients}>
            {Array(20)
              .fill(0)
              .map((_, index) => (
                <IngredientRow key={index} />
              ))}
          </div>
        </div>

        <div className={styles.feedFooter}>
          <div className="">
            <FormattedDate date={new Date()} className="text_color_inactive" />
          </div>
          <div className="d-flex align-center">
            <p className="text text_type_digits-default mr-2">510</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
