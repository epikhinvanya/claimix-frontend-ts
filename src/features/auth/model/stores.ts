import { createStore } from 'effector';
import { setUser } from './events';

export const $isAuthChecked = createStore(false);
export const $username = createStore<string>('Пользователь').on(setUser, (_, name) => name);


