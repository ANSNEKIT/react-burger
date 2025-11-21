import type { TIngredientDTO } from '@/contracts/ingredientDTO';
import type { TOrderDTO } from '@/contracts/orderDTO';
import type { TRegisterData } from '@/types/transport';
import type { TUserAuth } from '@/types/types';

const ingredientBun: TIngredientDTO = {
  _id: 'bun1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
};

const ingredientMain: TIngredientDTO = {
  _id: 'main1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0,
};

const ingredients: TIngredientDTO[] = [
  ingredientBun,
  ingredientMain,
  {
    _id: '3',
    name: 'Бигмак для теста',
    type: 'main',
    proteins: 400,
    fat: 111,
    carbohydrates: 222,
    calories: 4444,
    price: 555,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  },
  {
    _id: '4',
    name: 'Бигтейсти для теста',
    type: 'main',
    proteins: 500,
    fat: 123,
    carbohydrates: 234,
    calories: 5555,
    price: 777,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  },
  {
    _id: '5',
    name: 'Макчикен для теста',
    type: 'main',
    proteins: 300,
    fat: 234,
    carbohydrates: 345,
    calories: 6666,
    price: 765,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  },
];

const user: TUserAuth = {
  email: 'test@test.ru',
  name: 'testOne',
};

const order: TOrderDTO = {
  _id: '68e52a19673086001ba8c5ee',
  ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941'],
  status: 'done',
  name: 'Краторный био-марсианский бургер',
  createdAt: '2025-10-07T14:56:25.102Z',
  updatedAt: '2025-10-07T14:56:26.135Z',
  number: 90516,
};

const registerPayload: TRegisterData = {
  email: 'test@test.ru',
  password: '12345678Qq',
  name: 'testOne',
};

export default {
  ingredientBun,
  ingredientMain,
  ingredients,
  user,
  order,
  registerPayload,
};
