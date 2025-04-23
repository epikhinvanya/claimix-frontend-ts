import { useStore } from 'effector-react';
import { $username } from "../../features/auth/model/";


export default function DashboardPage() {
    const username = useStore($username) || 'Пользователь';
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 p-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Добро пожаловать, {username}</h1>
            <p className="text-gray-600 mt-2">Вот что происходит сегодня в Claimix</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700">Новые заявки</h2>
              <p className="text-3xl font-bold text-yellow-500 mt-2">14</p>
              <p className="text-sm text-gray-500 mt-1">+3 с прошлого дня</p>
            </div>
  
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700">Обработано</h2>
              <p className="text-3xl font-bold text-green-500 mt-2">36</p>
              <p className="text-sm text-gray-500 mt-1">+12 сегодня</p>
            </div>
  
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700">Ожидают ответа</h2>
              <p className="text-3xl font-bold text-red-500 mt-2">5</p>
              <p className="text-sm text-gray-500 mt-1">Обнови статус</p>
            </div>
          </div>
  
          
        </div>
      </div>
    );
  }
  