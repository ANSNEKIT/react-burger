import Form from '@/components/form/form';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import type { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

const Register = (): ReactElement => {
  const [state, setState] = React.useState({
    name: '',
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
    <p>
      Уже зарегистрированы? <span>Войти</span>
    </p>
  );

  return (
    <div className="page pageCenter">
      <Form title="Регистрация" links={<Links />}>
        <>
          <Input
            type={'text'}
            name={'name'}
            value={state.name}
            placeholder={'Имя'}
            extraClass="mb-6"
            onChange={onChange}
          />
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
            Зарегистрироваться
          </Button>
        </>
      </Form>
    </div>
  );
};

export default Register;
