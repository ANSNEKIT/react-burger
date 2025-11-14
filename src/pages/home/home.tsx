import { BurgerIngredients, BurgerConstructor } from '@/components';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

import type { ReactElement } from 'react';

const Home = (): ReactElement => {
  const { isLoading, error } = useSelector(getIngredientsState);

  if (isLoading) {
    return (
      <div className="page pageCenter">
        <h2 className="text text_type_main-large">Загрузка...</h2>
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div className="page pageCenter">
        <h2 className="text text_type_main-large">Ошибка: {error}</h2>;
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients />
      <BurgerConstructor />
    </DndProvider>
  );
};

export default Home;
