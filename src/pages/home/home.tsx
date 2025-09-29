import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { useAppDispatch } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { type ReactElement, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

import styles from './home.module.css';

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useSelector(getIngredientsState);

  useEffect(() => {
    void dispatch(loadIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  if (!isLoading && error) {
    return <h2>{`Ошибка: ${error}`}</h2>;
  }

  return (
    <div className="page flex-column">
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};

export default Home;
