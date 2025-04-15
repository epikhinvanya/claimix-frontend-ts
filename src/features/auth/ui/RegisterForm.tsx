import { useState } from 'react';
import { register } from '../model/authApi';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      sessionStorage.setItem('username', form.username);
      navigate('/dashboard');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden flex w-full max-w-5xl">
        
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Создайте аккаунт</h2>
            <p className="text-gray-500 mb-6">Регистрируйтесь и получайте доступ к Claimix</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <input
                type="password"
                name="password1"
                placeholder="Пароль"
                value={form.password1}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
              <input
                type="password"
                name="password2"
                placeholder="Повтор пароля"
                value={form.password2}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
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
            <a href="#" className="hover:underline">Условия использования</a>
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
