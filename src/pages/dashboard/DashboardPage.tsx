import { useUnit } from 'effector-react';
import { $username } from "../../features/auth/model/";
import { Workplace } from '../../pages/Workplace/Workplace';

export default function DashboardPage() {
  const username = useUnit($username) || 'Пользователь';

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-6 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Добро пожаловать, {username}!</h1>
            <p className="text-sm text-gray-500">Вот краткая сводка по заявкам</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-2">
            <h2 className="text-md font-semibold text-gray-700">Новые заявки</h2>
            <p className="text-3xl font-bold text-yellow-500">14</p>
            <p className="text-sm text-gray-500">+3 с прошлого дня</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-2">
            <h2 className="text-md font-semibold text-gray-700">Обработано</h2>
            <p className="text-3xl font-bold text-green-500">36</p>
            <p className="text-sm text-gray-500">+12 сегодня</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col gap-2">
            <h2 className="text-md font-semibold text-gray-700">Ожидают ответа</h2>
            <p className="text-3xl font-bold text-red-500">5</p>
            <p className="text-sm text-gray-500">Обнови статус</p>
          </div>
        </div>

        <Workplace />
      </div>
    </div>
  );
}
