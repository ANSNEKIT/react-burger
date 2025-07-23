import { getIngredients } from '@/api/ingredients.api';
import { BurgerConstructor } from '@/components/burger-contructor/burger-constructor';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredientDTO } from '@/contracts/ingredientDTO';

import styles from './app.module.css';

type TAppState = {
  isLoading: boolean;
  hasError: string | null;
  ingredients: TIngredientDTO[];
};

export const App = (): React.JSX.Element => {
  const [state, setState] = useState<TAppState>({
    isLoading: false,
    hasError: null,
    ingredients: [],
  });

  const fetchIngredients = async (): Promise<void> => {
    setState((prevState) => ({ ...prevState, isLoading: true }));

    const ingredients = await getIngredients();

    setState((prevState) => ({ ...prevState, isLoading: false, ingredients }));
  };

  useEffect(() => {
    void fetchIngredients();
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
            <BurgerIngredients ingredients={state.ingredients} />
            <BurgerConstructor ingredients={state.ingredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
