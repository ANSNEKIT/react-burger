import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setActiveCatigory, setCurrentIngredient } from '@/services/ingredients/reducer';
import {
  getActiveCategory,
  getBurgerIngredients,
  getCurrentIngredient,
} from '@/services/ingredients/selectors';
import { EIngredientTypeTitles, type TIngredientType } from '@/utils/types';

import { BurgerTabs } from '../burger-tabs/burger-tabs';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Ingredient } from '../ingredient/ingredient';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { ReactElement } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): ReactElement => {
  const dispatch = useAppDispatch();
  const ingredientsByType = useAppSelector(getBurgerIngredients);
  const activeCategory = useAppSelector(getActiveCategory);
  const currentIngredient = useAppSelector(getCurrentIngredient);

  const onCloseIngredientModal = (): void => {
    dispatch(setCurrentIngredient(null));
  };

  const onSelectIngredient = (ingredient: TIngredientDTO): void => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const onToggleCategory = (payload: TIngredientType): void => {
    dispatch(setActiveCatigory(payload));
  };

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav className={'mb-10'}>
          <BurgerTabs activeTab={activeCategory} onClickTab={onToggleCategory} />
        </nav>

        <div className={styles.ingredientsType}>
          {ingredientsByType.map(({ type, items }, idx) => (
            <div key={`${type}-${idx}`} className="mb-10">
              <h2 className={'mb-6 text text_type_main-medium'}>
                {EIngredientTypeTitles[type]}
              </h2>
              <div className={styles.ingredients}>
                {items.map((ing) => (
                  <Ingredient
                    key={ing._id}
                    ingredient={ing}
                    onClickCb={() => onSelectIngredient(ing)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {currentIngredient && (
        <IngredientDetails detail={currentIngredient} onClose={onCloseIngredientModal} />
      )}
    </>
  );
};
