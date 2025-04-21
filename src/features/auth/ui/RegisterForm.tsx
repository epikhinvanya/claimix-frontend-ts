import { ChangeEvent, FormEvent, useState } from 'react';
import { registerFx } from '../model/effects';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FiCheck, FiX } from 'react-icons/fi';

export default function RegisterForm() {
  const [form, setForm] = useState<FormDataRegister>({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [errors, setErrors] = useState<FormDataErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const passwordChecks: {
    [key: string]: {
      label: string;
      test: (v: string) => boolean;
    };
  } = {
    length: {
      label: 'Минимум 8 символов',
      test: (v) => v.length >= 8,
    },
    uppercase: {
      label: 'Заглавная буква',
      test: (v) => /[A-Z]/.test(v),
    },
    digit: {
      label: 'Цифра',
      test: (v) => /\d/.test(v),
    },
    special: {
      label: 'Спецсимвол (!@#$...)',
      test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: FormDataErrors = {};
    if (!form.username.trim()) newErrors.username = true;
    if (!form.email.includes('@')) newErrors.email = true;

    const failedChecks = Object.values(passwordChecks).filter(
      (check) => !check.test(form.password)
    );
    if (failedChecks.length > 0) newErrors.password = true;

    if (form.password !== form.password2) {
      newErrors.password2 = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGlobalError('');
  
    if (!validateForm()) return;
  
    try {
      await registerFx(form);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      setGlobalError('Ошибка регистрации. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex w-full max-w-5xl">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Создайте аккаунт</h2>
            <p className="text-gray-500 mb-6">Регистрируйтесь и получайте доступ к Claimix</p>

            {globalError && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-sm">
                {globalError}
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

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={`w-full h-12 px-4 border rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password1"
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

              <div className="mt-2 text-sm space-y-1 text-gray-500">
                {Object.entries(passwordChecks).map(([key, { label, test }]) => {
                  const passed = test(form.password);
                  return (
                    <div key={key} className="flex items-center gap-2">
                      <span className={passed ? 'text-green-500' : 'text-red-500'}>
                        {passed ? <FiCheck size={16} /> : <FiX size={16} />}
                      </span>
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="relative">
                <input
                  type={showPassword2 ? 'text' : 'password'}
                  name="password2"
                  placeholder="Повтор пароля"
                  value={form.password2}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 pr-12 border rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none ${
                    errors.password2 ? 'border-red-500' : ''
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword2((prev) => !prev)}
                    className="text-gray-500 focus:outline-none"
                  >
                    {showPassword2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="h-5 mt-1 text-xs text-red-500">
                {errors.password2 && 'Пароли должны совпадать'}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-xl transition"
              >
                Зарегистрироваться
              </button>
            </form>
          </div>

          <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
            <a href="/login" className="hover:underline">Уже есть аккаунт? Войти</a>
            {/* <a href="#" className="hover:underline">Условия использования</a> */}
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
