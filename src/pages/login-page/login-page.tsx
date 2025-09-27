import Auth from '@/components/auth/auth';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import type { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

const LoginPage = (): ReactElement => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });
  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const name = target.name;
    const val = target.value as string;
    setState({ ...state, [name]: val });
  };

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    console.log('submit data ', state);
  };

  const Links = (): ReactElement => (
    <>
      <p>
        Вы — новый пользователь? <span>Зарегистрироваться</span>
      </p>
      <p>
        Забыли пароль? <span>Восстановить пароль</span>
      </p>
    </>
  );

  return (
    <div className="page pageCenter">
      <Auth title="Вход" links={<Links />}>
        <>
          <EmailInput
            name={'email'}
            value={state.email}
            placeholder="Логин"
            isIcon={false}
            extraClass="mb-6"
            onChange={onChange}
          />
          <PasswordInput
            name={'password'}
            value={state.password}
            extraClass="mb-6"
            onChange={onChange}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="submitButton"
            onClick={onSubmit}
          >
            Войти
          </Button>
        </>
      </Auth>
    </div>
  );
};

export default LoginPage;
