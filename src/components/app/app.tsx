import { AppHeader } from '@/components';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/selectors';
import { checkAuth } from '@/services/user/actions';
import { useCallback, useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import AppRoutes from './app-routes';

import styles from './app.module.css';

export const App = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ingredients, isLoading, error } = useAppSelector(getIngredientsState);

  useEffect(() => {
    void dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (!isLoading && !error && ingredients.length === 0) {
      void dispatch(loadIngredients());
    }
  }, [isLoading, error, ingredients]);

  const onModalClose = useCallback(() => {
    void navigate(-1);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.mainContent} pl-5 pr-5`}>
        <AppRoutes onModalClose={onModalClose} />
      </main>
    </div>
  );
};

export default App;
