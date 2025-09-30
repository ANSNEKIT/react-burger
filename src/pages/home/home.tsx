import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { useAppDispatch } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { type ReactElement, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useSelector(getIngredientsState);

  useEffect(() => {
    void dispatch(loadIngredients());
  }, [dispatch]);

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
