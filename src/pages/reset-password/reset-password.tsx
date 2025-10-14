import Form from '@/components/form/form';
import { useForm } from '@/hooks/use-form';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { newPassword } from '@/services/user/actions';
import { getError, getIsLoading } from '@/services/user/selectors';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';

import type { ReactElement, SyntheticEvent } from 'react';

const ResetPassword = (): ReactElement => {
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, onChange] = useForm({
    password: '',
    emailCode: '',
  });

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    const data = {
      password: state.password,
      token: state.emailCode,
    };
    void dispatch(newPassword(data)).then(() => {
      void navigate('/');
    });
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
            disabled={isLoading}
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
