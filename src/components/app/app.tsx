import { AppHeader } from '@/components/app-header/app-header';
import Protected from '@/components/app-protected-route/app-protected-route';
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
          <Route path="/" element={<Protected component={<Home />} />} />

          <Route
            path="/login"
            element={<Protected isOnlyUnAuth component={<Login />} />}
          />
          <Route
            path="/register"
            element={<Protected isOnlyUnAuth component={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<Protected component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<Protected component={<ResetPassword />} />}
          />
          <Route path="/profile" element={<Protected component={<Profile />} />} />
          <Route
            path="/orders"
            element={
              <Protected
                component={
                  <div className="page pageCenter">
                    <h2 className="">Лента заказов</h2>
                  </div>
                }
              />
            }
          />
          <Route
            path="/ingredients/:id"
            element={<Protected component={<Ingredient />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Protected
                  component={
                    <Modal onClose={onModalClose}>
                      <IngredientDetails />
                    </Modal>
                  }
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
