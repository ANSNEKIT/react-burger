import { AppHeader, Protected, Modal, IngredientDetails, OrderItem } from '@/components';
import {
  ForgotPassword,
  Home,
  IngredientPage,
  Login,
  NotFound,
  Profile,
  ProfileInfo,
  Register,
  ResetPassword,
  FeedPage,
  FeedItemPage,
  ProfileOrders,
} from '@/pages';
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

import type { TLocationState } from '@/types/types';

import styles from './app.module.css';

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
          <Route path="/" element={<Home />} />

          {background && background.pathname === '/' && (
            <Route
              path="/ingredients/:id"
              element={
                <>
                  <Home />
                  <Modal onClose={onModalClose} title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                </>
              }
            />
          )}
          <Route path="/ingredients/:id" element={<IngredientPage />} />

          <Route path="/feed" element={<FeedPage />} />
          {background && background.pathname === '/feed' && background.param && (
            <Route
              path="/feed/:feedNumber"
              element={
                <>
                  <FeedPage />
                  <Modal onClose={onModalClose} title={`#${background.param}`}>
                    <OrderItem number={background.param} extraClass="mt-6" />
                  </Modal>
                </>
              }
            />
          )}
          <Route path="/feed/:feedNumber" element={<FeedItemPage />} />

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

          {/* Страница Профиль */}
          <Route path="profile" element={<Protected component={<Profile />} />}>
            <Route index element={<Protected component={<ProfileInfo />} />} />
            <Route path="orders" element={<Protected component={<ProfileOrders />} />} />
            {background &&
              background.pathname === '/profile/orders' &&
              background.param && (
                <Route
                  path="orders/:feedNumber"
                  element={
                    <Protected
                      component={
                        <>
                          <FeedItemPage />
                          <Modal onClose={onModalClose} title={`#${background.param}`}>
                            <OrderItem number={background.param} extraClass="mt-6" />
                          </Modal>
                        </>
                      }
                    />
                  }
                />
              )}
          </Route>

          <Route
            path="/profile/orders/:feedNumber"
            element={<Protected component={<FeedItemPage />} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
