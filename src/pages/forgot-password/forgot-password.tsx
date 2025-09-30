import Form from '@/components/form/form';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

import type { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

const ForgotPassword = (): ReactElement => {
  const [email, setEmail] = React.useState('');
  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const val = target.value as string;
    setEmail(val);
  };

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    console.log('submit email ', email);
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
          <EmailInput
            name={'email'}
            value={email}
            placeholder="Укажите email"
            isIcon={false}
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
            Восстановить
          </Button>
        </>
      </Form>
    </div>
  );
};

export default ForgotPassword;
