export enum EIngredientType {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}

export enum EIngredientTypeTitles {
  bun = 'Булки',
  main = 'Начинки',
  sauce = 'Соусы',
}

export enum EOrderStatus {
  created = 'created',
  pending = 'pending',
  done = 'done',
}

export enum EOrderStatusTitles {
  created = 'Создан',
  pending = 'Готовится',
  done = 'Выполнен',
}

export enum EWebsocketStatus {
  DISCONNECT = 'DISCONNECT',
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
