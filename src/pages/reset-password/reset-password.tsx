import Form from '@/components/form/form';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

import type { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

const ResetPassword = (): ReactElement => {
  const [state, setState] = React.useState({
    password: '',
    emailCode: '',
  });
  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const name = target.name;
    const val = target.value as string;
    setState({ ...state, [name]: val });
  };

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    console.log('submit resetPassword ', state);
  };

  const Links = (): ReactElement => (
    <p>
      Вспомнили пароль? <Link to="/login">Войти</Link>
    </p>
  );

  return (
    <div className="page pageCenter">
      <Form title="Восстановление пароля" links={<Links />}>
        <>
          <PasswordInput
            name={'password'}
            value={state.password}
            placeholder="Введите новый пароль"
            extraClass="mb-6"
            onChange={onChange}
          />
          <Input
            type={'text'}
            name={'emailCode'}
            value={state.emailCode}
            placeholder="Введите код из письма"
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
            Сохранить
          </Button>
        </>
      </Form>
    </div>
  );
};

export default ResetPassword;
