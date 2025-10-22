import { BurgerCategory, BurgerTabs } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setActiveCatigory } from '@/services/ingredients/reducer';
import {
  getActiveCategory,
  getBurgerIngredients,
} from '@/services/ingredients/selectors';
import { EIngredientTypeTitles } from '@/types/enums';
import { useEffect, useCallback, useMemo, useRef, type ReactElement } from 'react';

import type { TIngredientType } from '@/types/types';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = (): ReactElement => {
  const dispatch = useAppDispatch();
  const ingredientsByType = useAppSelector(getBurgerIngredients);
  const activeCategory = useAppSelector(getActiveCategory);

  const categoriesRef = useRef<HTMLDivElement | null>(null);
  const bunRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);

  const categoryRefs = useMemo(
    () => ({
      bun: bunRef,
      main: mainRef,
      sauce: sauceRef,
    }),
    [bunRef, mainRef, sauceRef]
  );

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
    let activeCategory: TIngredientType = 'bun';

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
        activeCategory = categoryName as TIngredientType;
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
        activeCategory = categoryName as TIngredientType;
      });
    }

    dispatch(setActiveCatigory(activeCategory));
  }, [categoryRefs, dispatch]);

  useEffect(() => {
    dispatch(setActiveCatigory('bun'));

    categoriesRef.current?.addEventListener('scroll', onScrollCategoryIngredients);

    return (): void => {
      categoriesRef.current?.removeEventListener('scroll', onScrollCategoryIngredients);
    };
  }, [categoriesRef, dispatch, onScrollCategoryIngredients]);

  return (
    <div className={styles.burgerIngredientsWrap}>
      <h2 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h2>
      <section className={styles.burgerIngredients}>
        <nav className={'mb-10'}>
          <BurgerTabs activeTab={activeCategory} onClickTab={onToggleCategory} />
        </nav>

        <div className={styles.ingredientsType} ref={categoriesRef}>
          {ingredientsByType.map(({ type, items }, idx) => (
            <div key={`${type}-${idx}`} ref={categoryRefs[type]} className="mb-10">
              <BurgerCategory title={EIngredientTypeTitles[type]} ingredients={items} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BurgerIngredients;
