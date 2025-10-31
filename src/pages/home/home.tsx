import { BurgerIngredients, BurgerConstructor } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { type ReactElement, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

const Home = (): ReactElement => {
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
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};

export default Home;
