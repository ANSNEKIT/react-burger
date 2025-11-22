import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router';

import { store } from './services/store';
import { App } from '@components/app/app';

import './index.css';

const isProdMode = import.meta.env.MODE === 'production';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isProdMode && (
      <HashRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </HashRouter>
    )}

    {!isProdMode && (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    )}
  </StrictMode>
);
