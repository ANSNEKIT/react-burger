import { AppHeader } from '@/components/app-header/app-header';
import { Modal } from '@/components/base-modal/base-modal';
import IngredientDetails from '@/components/ingredient-details/ingredient-details';
import ForgotPassword from '@/pages/forgot-password/forgot-password';
import Home from '@/pages/home/home';
import Ingredient from '@/pages/ingredient/ingredient';
import Login from '@/pages/login/login';
import NotFound from '@/pages/not-found/not-found';
import Profile from '@/pages/profile/profile';
import Register from '@/pages/register/register';
import ResetPassword from '@/pages/reset-password/reset-password';
import { useCallback, type ReactElement } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import styles from './app.module.css';

export const App = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const background = location.state?.background as unknown as string;

  const onModalClose = useCallback(() => {
    void navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.mainContent} pl-5 pr-5`}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/orders"
            element={
              <div className="page pageCenter">
                <h2 className="">Лента заказов</h2>
              </div>
            }
          />
          <Route path="/ingredients/:id" element={<Ingredient />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal onClose={onModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
