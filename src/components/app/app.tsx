import ConstructorPage from '@/pages/constructor-page/constructor-page';

import { AppHeader } from '../app-header/app-header';

import type { ReactElement } from 'react';

import styles from './app.module.css';

export const App = (): ReactElement => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <ConstructorPage />
    </div>
  );
};

export default App;
