import IngredientDetails from '@/components/ingredient-details/ingredient-details';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { useEffect, type ReactElement } from 'react';
import { useSelector } from 'react-redux';

import styles from './ingredient.module.css';

const Ingredient = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { ingredients, isLoading: isLoadingIngredinets } =
    useAppSelector(getIngredientsState);
  const { isLoading, error } = useSelector(getIngredientsState);

  useEffect(() => {
    if (!isLoadingIngredinets && ingredients.length === 0) {
      void dispatch(loadIngredients());
    }
  }, [isLoadingIngredinets, ingredients, dispatch]);

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
