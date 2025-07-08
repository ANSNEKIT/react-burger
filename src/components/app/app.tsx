import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { ingredients } from '@utils/ingredients';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: null,
    ingredients: [],
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));

    setTimeout(() => {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }, 3000);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {state.isLoading && <div>Загрузка</div>}
        {!state.isLoading && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
