import ForgotPassword from '@/pages/forgot-password/forgot-password';
import Home from '@/pages/home/home';
import Ingredient from '@/pages/ingredient/ingredient';
import Login from '@/pages/login/login';
import NotFound from '@/pages/not-found/not-found';
import Profile from '@/pages/profile/profile';
import Register from '@/pages/register/register';
import ResetPassword from '@/pages/reset-password/reset-password';
import { Route, Routes } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';

import type { ReactElement } from 'react';

import styles from './app.module.css';

export const App = (): ReactElement => {
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
      </main>
    </div>
  );
};

export default App;
