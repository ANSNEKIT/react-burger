import { IngredientDetails, Modal, OrderItem, Protected } from '@/components';
import {
  FeedItemPage,
  FeedPage,
  ForgotPassword,
  Home,
  IngredientPage,
  Login,
  NotFound,
  Profile,
  ProfileInfo,
  ProfileOrders,
  Register,
  ResetPassword,
} from '@/pages';
import { Route, Routes, useLocation } from 'react-router-dom';

import type { TLocationState } from '@/types/types';
import type { ReactElement } from 'react';
import type { Location } from 'react-router-dom';

type TAppRoutesProps = {
  onModalClose: () => void;
};

const AppRoutes = ({ onModalClose }: TAppRoutesProps): ReactElement => {
  const location = useLocation() as Location<TLocationState>;
  const { background } = location?.state ?? {};

  return (
    <>
      <Routes location={background || location.state}>
        <Route path="/" element={<Home />} />

        <Route path="/ingredients/:id" element={<IngredientPage />} />

        <Route path="/feed" element={<FeedPage />} />
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
        </Route>

        <Route
          path="/profile/orders/:feedNumber"
          element={<Protected component={<FeedItemPage />} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={onModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          />

          {background?.param && (
            <Route
              path="/feed/:feedNumber"
              element={
                <Modal onClose={onModalClose} title={`#${background.param}`}>
                  <OrderItem extraClass="mt-6" itemNumber={background.param} />
                </Modal>
              }
            />
          )}

          {background?.param && (
            <Route path="profile" element={<Protected component={<Profile />} />}>
              <Route
                path="orders/:feedNumber"
                element={
                  <Protected
                    component={
                      <Modal onClose={onModalClose} title={`#${background.param}`}>
                        <OrderItem
                          extraClass="mt-6"
                          isOrderItem
                          itemNumber={background.param}
                        />
                      </Modal>
                    }
                  />
                }
              />
            </Route>
          )}
        </Routes>
      )}
    </>
  );
};

export default AppRoutes;
