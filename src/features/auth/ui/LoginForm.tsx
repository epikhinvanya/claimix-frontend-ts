import { useState, ChangeEvent, FormEvent } from 'react';
import { loginFx } from '../model/effects';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

export default function LoginForm() {
  const [form, setForm] = useState<FormDataAuth>({ username: '', password: '' });
  const [errors, setErrors] = useState<FormDataErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.username.trim()) newErrors.username = true;
    if (!form.password) newErrors.password = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    if (!validateForm()) return;

    try {
      await loginFx(form);
      navigate('/dashboard');
    } catch {
      setGlobalError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Вход в аккаунт</h2>
      <p className="text-sm text-gray-500 mb-6">Пожалуйста, введите ваши данные</p>

      {globalError && (
        <div className="mb-4 flex items-center text-sm text-red-600 gap-2">
          <FiAlertCircle size={18} />
          <span>{globalError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            value={form.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500 ${
              errors.username ? 'border-red-500' : ''
            }`}
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 pr-12 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500 ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Войти
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Нет аккаунта? <a href="/register" className="text-blue-600 underline">Зарегистрироваться</a>
      </div>
    </div>
  );
}
