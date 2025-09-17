import { Ingredient } from '../ingredient/ingredient';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './burger-category.module.css';

type TBurgerCategoryProps = {
  title: string;
  ingredients: TIngredientDTO[];
  onSelectIngredient: (ing: TIngredientDTO) => void;
};

export const BurgerCategory = ({
  title,
  ingredients,
  onSelectIngredient,
}: TBurgerCategoryProps): ReactElement => {
  return (
    <div>
      <h2 className={'mb-6 text text_type_main-medium'}>{title}</h2>
      <div className={styles.ingredients}>
        {ingredients.map((ing) => (
          <Ingredient
            key={ing._id}
            ingredient={ing}
            onClickCb={() => onSelectIngredient(ing)}
          />
        ))}
      </div>
    </div>
  );
};
