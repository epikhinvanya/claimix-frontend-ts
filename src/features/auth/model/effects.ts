import { createEffect } from "effector";
import api from '../../../shared/api/axiosInstance';


export const loginFx = createEffect(async (data: FormDataAuth): Promise<string> => {
    const res = await api.post('/auth/login/', data);
    const access = res.data.access;
    const refresh = res.data.refresh;
  
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
    return access;
  });

  export const registerFx = createEffect(async (data: FormDataRegister): Promise<string> => {
    const res = await api.post('/auth/register/', data);
    const access = res.data.access;
    const refresh = res.data.refresh;
  
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
    return access;
  });