import Form from '@/components/form/form';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { changeUser } from '@/services/user/actions';
import { getUserSlice } from '@/services/user/selectors';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React, { useEffect } from 'react';

import type { TChangeUserData } from '@/api/types';
import type { ChangeEvent, ReactElement } from 'react';

const ProfileInfo = (): ReactElement => {
  const { user, isLoading } = useAppSelector(getUserSlice);
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const isEdit = React.useMemo(() => {
    const isEqualName = (user?.name ?? '') === state.name;
    const isEqualEmail = (user?.email ?? '') === state.email;
    const isPasswordEdit = !!state.password;

    return !isEqualName || !isEqualEmail || isPasswordEdit;
  }, [user, state]);

  const onUserDefault = (): void => {
    if (user) {
      setState(() => ({
        ...state,
        name: user.name,
        email: user.email,
        password: '',
      }));
    }
  };

  useEffect(() => {
    onUserDefault();
  }, []);

  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const name = target.name;
    const val = target.value as string;
    setState({ ...state, [name]: val });
  };

  const onChangeUser = (): void => {
    const data = {} as TChangeUserData;
    if (user?.email !== state.email) {
      data.email = state.email;
    } else if (user?.name !== state.name) {
      data.name = state.name;
    } else if (state.password) {
      data.password = state.password;
    }

    if (Object.keys(data).length > 0) {
      void dispatch(changeUser(data));
    }
  };

  return (
    <Form>
      <>
        <Input
          type={'text'}
          name={'name'}
          value={state.name}
          placeholder={'Имя'}
          extraClass="mb-6"
          icon="EditIcon"
          onChange={onChange}
        />
        <EmailInput
          name={'email'}
          value={state.email}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
          onChange={onChange}
        />
        <PasswordInput
          name={'password'}
          value={state.password}
          extraClass="mb-6"
          icon="EditIcon"
          onChange={onChange}
        />
        {isEdit && (
          <div className="d-flex w-100 justify-end">
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              extraClass=""
              onClick={onUserDefault}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass=""
              disabled={isLoading}
              onClick={onChangeUser}
            >
              Сохранить
            </Button>
          </div>
        )}
      </>
    </Form>
  );
};

export default ProfileInfo;
