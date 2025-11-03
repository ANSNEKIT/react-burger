import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './ingredient-row.module.css';

type TIngredientRowProps = {
  ingredient?: TIngredientDTO;
};

const IngredientRow = ({ ingredient }: TIngredientRowProps): ReactElement => {
  return (
    <div className={styles.ingredientRow}>
      <div className={styles.preview}>
        <img
          src={ingredient?.image_mobile}
          className={`${styles.image}`}
          alt={ingredient?.name ?? 'Ингредиент image'}
        />
      </div>
      <h3 className="grow-1 text text_type_main-default">Флюоресцентная булка R2-D3</h3>
      <div className="d-flex align-center">
        <p className="text text_type_digits-default mr-2">2 x 510</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default IngredientRow;
