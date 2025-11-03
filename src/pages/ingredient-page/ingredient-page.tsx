import IngredientDetails from '@/components/ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { useEffect, type ReactElement } from 'react';

import styles from './ingredient-page.module.css';

const Ingredient = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { ingredients, isLoading, error } = useAppSelector(getIngredientsState);

  useEffect(() => {
    if (!isLoading && ingredients.length === 0) {
      void dispatch(loadIngredients());
    }
  }, [isLoading, ingredients, dispatch]);

  if (isLoading) {
    return (
      <div className="page pageCenter">
        <h2 className="text text_type_main-large">Загрузка...</h2>
      </div>
    );
  }

  if (!isLoading && error) {
    return <h2 className="text text_type_main-large">Ошибка: {error}</h2>;
  }

  return (
    <div className={`page ${styles.ingredient}`}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
};

export default Ingredient;
