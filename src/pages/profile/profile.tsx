import Form from '@/components/form/form';
import Menu, { type TMenuItem } from '@/components/menu/menu';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { ChangeEvent, ReactElement } from 'react';

import styles from './profile.module.css';

const Profile = (): ReactElement => {
  const links = [
    { id: crypto.randomUUID(), name: 'Профиль', to: '/profile' },
    { id: crypto.randomUUID(), name: 'История заказов', to: '/orders' },
  ];
  const buttons = [
    { id: crypto.randomUUID(), type: 'logout', name: 'Выход', to: '/login' },
  ];
  const [state, setState] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLFormElement;
    const name = target.name;
    const val = target.value as string;
    setState({ ...state, [name]: val });
  };

  const onClickButton = (btn: TMenuItem): void => {
    if (btn.type === 'logout') {
      // TODO добавить логику логаута
      void navigate('/login');
    }
  };

  return (
    <div className={`page ${styles.profile}`}>
      <Menu links={links} buttons={buttons} onClickButton={onClickButton} />
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
    </div>
  );
};

export default Profile;
