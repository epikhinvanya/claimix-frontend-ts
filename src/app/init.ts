import { setUser } from "@features/auth/model";

export function initSession() {
    const token = sessionStorage.getItem('token');
    const refresh = sessionStorage.getItem('refresh');
    const username = sessionStorage.getItem('username');
  
    if (username) setUser(username);
  }