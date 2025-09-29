import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './ingredient.module.css';

const Ingredient = (): ReactElement => {
  const currentIngredient: TIngredientDTO = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  };

  return (
    <div className={`page ${styles.ingredient}`}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails detail={currentIngredient} />
    </div>
  );
};

export default Ingredient;
