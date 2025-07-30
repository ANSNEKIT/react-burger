import { useAppDispatch } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-contructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
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
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
