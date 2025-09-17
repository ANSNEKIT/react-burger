import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setActiveCatigory, setCurrentIngredient } from '@/services/ingredients/reducer';
import {
  getActiveCategory,
  getBurgerIngredients,
  getCurrentIngredient,
} from '@/services/ingredients/selectors';
import { EIngredientTypeTitles, type TIngredientType } from '@/utils/types';
import { useEffect, useCallback, useMemo, useRef, type ReactElement } from 'react';

import { BurgerCategory } from '../burger-category/burger-category';
import { BurgerTabs } from '../burger-tabs/burger-tabs';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): ReactElement => {
  const dispatch = useAppDispatch();
  const ingredientsByType = useAppSelector(getBurgerIngredients);
  const activeCategory = useAppSelector(getActiveCategory);
  const currentIngredient = useAppSelector(getCurrentIngredient);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  const categoryRefs = useMemo(
    () => ({
      bun: bunRef,
      main: mainRef,
      sauce: sauceRef,
    }),
    [bunRef, mainRef, sauceRef]
  );

  const onCloseIngredientModal = (): void => {
    dispatch(setCurrentIngredient(null));
  };

  const onSelectIngredient = (ingredient: TIngredientDTO): void => {
    dispatch(setCurrentIngredient(ingredient));
  };

  const onToggleCategory = (payload: TIngredientType): void => {
    dispatch(setActiveCatigory(payload));
  };

  const onScrollCategoryIngredients = useCallback(() => {
    if (!categoriesRef.current) {
      return;
    }

    const defaultThreshold = 50;
    let minDistance = Infinity;
    const categoriesTop = categoriesRef.current.getBoundingClientRect().top;

    Object.entries(categoryRefs).forEach(([categoryName, ref]) => {
      if (!ref.current) {
        return;
      }

      const categoryRect = ref.current?.getBoundingClientRect();
      const categoryTop = categoryRect.top;
      const diffFromTop = Math.abs(categoryTop - categoriesTop);

      // Если заголовок категории в видимой области и близко к верху
      if (categoryTop <= categoriesTop + defaultThreshold && diffFromTop < minDistance) {
        minDistance = diffFromTop;
        dispatch(setActiveCatigory(categoryName as TIngredientType));
      }
    });

    if (minDistance === Infinity) {
      Object.entries(categoryRefs).forEach(([categoryName, ref]) => {
        if (!ref.current) {
          return;
        }

        const categoryRect = ref.current.getBoundingClientRect();
        const categoryTop = categoryRect.top;
        const diffFromTop = Math.abs(categoriesTop - categoryTop);
        minDistance = diffFromTop;
        dispatch(setActiveCatigory(categoryName as TIngredientType));
      });
    }
  }, [categoryRefs, dispatch]);

  useEffect(() => {
    dispatch(setActiveCatigory('bun'));

    categoriesRef.current?.addEventListener('scroll', onScrollCategoryIngredients);

    return (): void => {
      categoriesRef.current?.removeEventListener('scroll', onScrollCategoryIngredients);
    };
  }, [categoriesRef, dispatch, onScrollCategoryIngredients]);

  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav className={'mb-10'}>
          <BurgerTabs activeTab={activeCategory} onClickTab={onToggleCategory} />
        </nav>

        <div className={styles.ingredientsType} ref={categoriesRef}>
          {ingredientsByType.map(({ type, items }, idx) => (
            <div key={`${type}-${idx}`} ref={categoryRefs[type]} className="mb-10">
              <BurgerCategory
                title={EIngredientTypeTitles[type]}
                ingredients={items}
                onSelectIngredient={(ing) => onSelectIngredient(ing)}
              />
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
