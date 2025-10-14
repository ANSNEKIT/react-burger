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
import ProfileInfo from '@/pages/profile/profile-info';
import Register from '@/pages/register/register';
import ResetPassword from '@/pages/reset-password/reset-password';
import { useAppDispatch } from '@/services/hooks';
import { checkAuth } from '@/services/user/actions';
import { useCallback, useEffect, type ReactElement } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';

import styles from './app.module.css';

type TLocationState = {
  background: { pathname: string };
};

export const App = (): ReactElement => {
  const location = useLocation() as Location<TLocationState>;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { background } = location?.state ?? {};

  useEffect(() => {
    void dispatch(checkAuth());
  }, []);

  const onModalClose = useCallback(() => {
    void navigate(-1);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.mainContent} pl-5 pr-5`}>
        <Routes>
          {background && (
            <Route
              path="/ingredients/:id"
              element={
                <>
                  <Home />
                  <Modal onClose={onModalClose}>
                    <IngredientDetails />
                  </Modal>
                </>
              }
            />
          )}
          <Route path="/ingredients/:id" element={<Ingredient />} />

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
            element={<Protected isOnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<Protected isOnlyUnAuth component={<ResetPassword />} />}
          />
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
          <Route path="profile" element={<Protected component={<Profile />} />}>
            <Route index element={<Protected component={<ProfileInfo />} />} />
            <Route
              path="orders"
              element={
                <Protected
                  component={
                    <div className="page pageCenter">
                      <h2 className="">История заказов</h2>
                    </div>
                  }
                />
              }
            />
          </Route>

          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
