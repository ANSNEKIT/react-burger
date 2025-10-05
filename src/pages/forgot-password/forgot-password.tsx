import Form from '@/components/form/form';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { resetPassword } from '@/services/user/actions';
import { getError, getIsLoading } from '@/services/user/selectors';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { ChangeEvent, ReactElement, SyntheticEvent } from 'react';

const ForgotPassword = (): ReactElement => {
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);
  const isEmailConfirmed = Boolean(localStorage.getItem('isEmailConfirmed') ?? false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const val = target.value as string;
    setEmail(val);
  };

  useEffect(() => {
    if (isEmailConfirmed) {
      void navigate('/reset-password');
    }
  }, [navigate, isEmailConfirmed]);

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    void dispatch(resetPassword({ email })).then(void navigate('/reset-password'));
  };

  const Links = (): ReactElement => (
    <p>
      Вспомнили пароль? <Link to="/login">Войти</Link>
    </p>
  );

  return (
    <div className="page pageCenter">
      <Form
        title="Восстановление пароля"
        links={<Links />}
        isLoading={isLoading}
        error={error}
      >
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
            disabled={isLoading}
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
