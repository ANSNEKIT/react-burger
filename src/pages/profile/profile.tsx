import Form from '@/components/form/form';
import Menu from '@/components/menu/menu';
import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import React from 'react';

import type { ChangeEvent, ReactElement } from 'react';

import styles from './profile.module.css';

const Profile = (): ReactElement => {
  const menuItems = [
    { id: crypto.randomUUID(), name: 'Профиль', to: '#' },
    { id: crypto.randomUUID(), name: 'История заказов', to: '#' },
    { id: crypto.randomUUID(), name: 'Выход', to: '#' },
  ];
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

  return (
    <div className={`page ${styles.profile}`}>
      <Menu items={menuItems} />
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
