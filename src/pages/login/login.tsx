import Form from '@/components/form/form';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { login } from '@/services/user/actions';
import { getError, getIsLoading } from '@/services/user/selectors';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

import type { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

const Login = (): ReactElement => {
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);
  const dispatch = useAppDispatch();
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

    void dispatch(login(state));
  };

  const Links = (): ReactElement => (
    <>
      <p>
        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p>
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </>
  );

  return (
    <div className="page pageCenter">
      <Form title="Вход" links={<Links />} isLoading={isLoading} error={error}>
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
            disabled={isLoading}
            onClick={onSubmit}
          >
            Войти
          </Button>
        </>
      </Form>
    </div>
  );
};

export default Login;
