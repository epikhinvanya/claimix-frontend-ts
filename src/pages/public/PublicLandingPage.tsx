import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Application {
  id: number;
  claimant: {
    name: string;
    phone_number: string;
  };
  status: string;
  data: {
    message: string;
  };
  created_at: string;
}

export default function PublicLandingPage() {
  const navigate = useNavigate();
  const [subdomain, setSubdomain] = useState<string>('Claimix');
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split('.');
    setSubdomain(parts[0]);
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;

    try {
      setLoading(true);
      setError('');
      setApplications([]);

      const response = await axios.get(`http://твой_бекенд/api/applications/search`, {
        params: {
          tag: searchQuery,
        },
      });

      setApplications(response.data);
    } catch (err) {
      console.error('Ошибка поиска:', err);
      setError('Ошибка при поиске. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-6 py-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Добро пожаловать в <span className="capitalize">{subdomain}</span>
          </h1>
          <p className="text-sm text-gray-500">Создайте новую заявку</p>

          <div className="flex flex-col">
            <button
              onClick={() => navigate('/new-application')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition"
            >
              Создать новую заявку
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800">Поиск по тегу</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Введите тег..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
            >
              Найти
            </button>
          </div>

          <div className="mt-6">
            {loading && <p className="text-gray-500">Загрузка...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && applications.length === 0 && searchQuery !== '' && !error && (
              <p className="text-gray-500">Ничего не найдено.</p>
            )}
            {!loading && applications.length > 0 && (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="text-md font-semibold text-gray-800">
                      {app.claimant?.name || 'Без имени'}
                    </p>
                    <p className="text-sm text-gray-500">{app.claimant?.phone_number || 'Нет телефона'}</p>
                    <p className="text-sm text-gray-600 mt-1">{app.data?.message || 'Без сообщения'}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Статус: {app.status} | Подана: {new Date(app.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
