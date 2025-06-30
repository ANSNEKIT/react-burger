export enum EIngredientType {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export type TIngredientType = `${EIngredientType}`;

export enum EIngredientTypeTitles {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы',
}

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};
