import { ChangeEvent, FormEvent, useState } from 'react';
import { loginFx } from '../model/effects';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FiAlertCircle } from 'react-icons/fi';

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
    const newErrors: FormDataErrors = {};
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
    } catch (err) {
      console.error('Login failed:', err);
      setGlobalError('Неверное имя пользователя или пароль');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex w-full max-w-5xl">

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Войти в Claimix</h2>
            <p className="text-gray-500 mb-6">Введите данные для входа в аккаунт</p>

            {globalError && (
              <div className="mb-4 flex items-center text-sm text-red-600 gap-2">
                <FiAlertCircle size={18} className="mt-[1px]" />
                <span>{globalError}</span>
              </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={form.username}
                onChange={handleChange}
                className={`w-full h-12 px-4 border rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                  errors.username ? 'border-red-500' : ''
                }`}
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 pr-12 border rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-xl transition"
              >
                Войти
              </button>
            </form>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
            <a href="register/" className="hover:underline">Нет аккаунта? Зарегистрироваться</a>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
            alt="meeting"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10" />
        </div>
      </div>
    </div>
  );
}
