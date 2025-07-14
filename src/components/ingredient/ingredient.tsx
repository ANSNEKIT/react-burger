import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './ingredient.module.css';

type TIngredientProps = {
  ingredient: TIngredientDTO;
  onClickCb: () => void;
};

export const Ingredient = ({
  ingredient,
  onClickCb,
}: TIngredientProps): ReactElement => {
  return (
    <div className={styles.ingredient} onClick={onClickCb}>
      <picture>
        <source
          media="(max-width: 600px)"
          srcSet={ingredient.image_mobile}
          type="image/png"
        />
        <source media="(max-width: 1200px)" srcSet={ingredient.image} type="image/png" />
        <img
          src={ingredient.image_large}
          className={`mr-4 ml-4 mb-1 ${styles.ingredientImage}`}
          alt={ingredient.name}
        />
      </picture>

      <div className={`mb-1 text text_type_main-medium ${styles.ingredientPrice}`}>
        {ingredient.price} <CurrencyIcon type="primary" />
      </div>
      <div className={`text text_type_main-default ${styles.ingredientName}`}>
        {ingredient.name}
      </div>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};
