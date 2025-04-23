import { createEffect } from "effector";
import api from '../../../shared/api/axiosInstance';
import { setUser } from "./events";


export const loginFx = createEffect(async (data: FormDataAuth): Promise<string> => {
    const res = await api.post('/api/token/', data);
    const access = res.data.access;
    const refresh = res.data.refresh;
    const username = data.username;

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
    return access;
  });

  export const registerFx = createEffect(async (data: FormDataRegister): Promise<string> => {
    const res = await api.post('/auth/register/', data);
    const access = res.data.access;
    const refresh = res.data.refresh;
    const username = data.username;

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);

    setUser(username);
    return access;
  });