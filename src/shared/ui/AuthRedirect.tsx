import { Navigate } from 'react-router-dom';

export default function AuthRedirect({ children }) {
  const token = sessionStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
}
