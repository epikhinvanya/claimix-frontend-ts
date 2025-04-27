import { useState, ChangeEvent, FormEvent } from 'react';
import { registerFx } from '../model/effects';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [globalError, setGlobalError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const passwordChecks = {
    length: {
      label: 'Минимум 8 символов',
      test: (v: string) => v.length >= 8,
    },
    uppercase: {
      label: 'Заглавная буква',
      test: (v: string) => /[A-Z]/.test(v),
    },
    digit: {
      label: 'Цифра',
      test: (v: string) => /\d/.test(v),
    },
    special: {
      label: 'Спецсимвол (!@#$...)',
      test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
    },
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!form.username.trim()) newErrors.username = true;
    if (!form.email.includes('@')) newErrors.email = true;

    const failedChecks = Object.values(passwordChecks).filter(
      (check) => !check.test(form.password)
    );
    if (failedChecks.length > 0) newErrors.password = true;

    if (form.password !== form.password2) newErrors.password2 = true;

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
    } catch {
      setGlobalError('Ошибка регистрации. Проверьте данные и попробуйте снова.');
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Создайте аккаунт</h2>
      <p className="text-sm text-gray-500 mb-6">Регистрируйтесь и получайте доступ к Claimix</p>

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
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500 ${
            errors.username ? 'border-red-500' : ''
          }`}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500 ${
            errors.email ? 'border-red-500' : ''
          }`}
        />
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
            className={`w-full px-4 py-2 pr-12 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500 ${
              errors.password2 ? 'border-red-500' : ''
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword2((prev) => !prev)}
            className="absolute inset-y-0 right-3 text-gray-500"
          >
            {showPassword2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {errors.password2 && (
          <p className="text-red-500 text-xs mt-1">Пароли должны совпадать</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>

      <div className="mt-6 text-sm text-gray-500 text-center">
        Уже есть аккаунт? <a href="/login" className="text-blue-600 underline">Войти</a>
      </div>
    </div>
  );
}
