import Home from '@/pages/home/home';

import { AppHeader } from '../app-header/app-header';

import type { ReactElement } from 'react';

import styles from './app.module.css';

export const App = (): ReactElement => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Home />
    </div>
  );
};

export default App;
