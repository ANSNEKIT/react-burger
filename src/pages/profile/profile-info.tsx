import Form from '@/components/form/form';
import { useAppSelector } from '@/services/hooks';
import { getUser } from '@/services/user/selectors';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React, { useEffect } from 'react';

import type { ChangeEvent, ReactElement } from 'react';

const ProfileInfo = (): ReactElement => {
  const user = useAppSelector(getUser);
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) {
      setState(() => ({
        ...state,
        name: user.name,
        email: user.email,
      }));
    }
  }, []);

  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const name = target.name;
    const val = target.value as string;
    setState({ ...state, [name]: val });
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
          icon="DragIcon"
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
      </>
    </Form>
  );
};

export default ProfileInfo;
