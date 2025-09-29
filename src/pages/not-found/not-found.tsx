import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import type { ReactElement } from 'react';

const NotFound = (): ReactElement => {
  const navigate = useNavigate();

  const handleGoHome = (): void => {
    void navigate('/');
  };

  return (
    <div className="page pageCenter">
      <div>
        <h1 className="text text_type_digits-large mb-10">404</h1>

        <h2 className="text text_type_main-large mb-5">Страница не найдена</h2>

        <p className="text text_type_main-default text_color_inactive mb-10">
          К сожалению, страница не существует((
        </p>

        <Button htmlType="button" type="primary" size="large" onClick={handleGoHome}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
