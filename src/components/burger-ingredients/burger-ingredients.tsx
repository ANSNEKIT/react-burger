import { BurgerTabs } from '@/components/burger-tabs/burger-tabs';
import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { getBurgerIngredients } from '@/utils/ingredients';
import { EIngredientTypeTitles } from '@/utils/types';
import { useState } from 'react';

import { Ingredient } from '@components/ingredient/ingredient';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TIngredientType } from '@/utils/types';
import type { ReactElement } from 'react';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredientDTO[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): ReactElement => {
  const [activeTab, setActiveTab] = useState<TIngredientType>('main');
  const [currentIngredient, setCurrentIngredient] = useState<TIngredientDTO | null>(
    null
  );
  const toggleTab = (tab: TIngredientType): void => {
    setActiveTab(tab);
  };

  const ingredientsByType = getBurgerIngredients(ingredients);

  const onCloseIngredientModal = (): void => {
    setCurrentIngredient(null);
  };

  const onSelectIngredient = (ingredient: TIngredientDTO): void => {
    setCurrentIngredient(ingredient);
  };

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav className={'mb-10'}>
          <BurgerTabs activeTab={activeTab} onClickTab={toggleTab} />
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
