import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Select, SelectItem } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Application {
  id: number;
  status: string;
  claimant: {
    name: string;
    phone_number: string;
  };
  data: {
    message: string;
  };
  created_at: string;
}

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://test.claimix.ru/api/workflows/applications/', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NzU5MTYwLCJpYXQiOjE3NDU3NTczNjAsImp0aSI6IjczNTRiYTNmZDUwMDRhZGVhOTNjNzNjYWM1MjAwMjJiIiwidXNlcl9pZCI6MTA2fQ.PpyTO3uJ66jX2B-0R87bLi15zVv1y_qLZvo92wDIOpI',
        },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error('Ошибка загрузки заявок', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = applications.filter(
    (app) => (statusFilter ? app.status === statusFilter : true)
  );

  const renderTable = () => (
    <div className="space-y-4">
      {loading ? (
        <p className="text-sm text-gray-500">Загрузка заявок...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500">Заявки не найдены.</p>
      ) : (
        filtered.map((app) => (
          <Card key={app.id} className="p-4 border border-gray-200 rounded-2xl shadow-sm bg-white">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-md font-semibold text-gray-800">
                  {app.claimant?.name || 'Без имени'}
                </h3>
                <p className="text-sm text-gray-500">{app.claimant?.phone_number || '—'}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Текст: {app.data?.message || 'Без сообщения'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Подана: {new Date(app.created_at).toLocaleString()}
                </p>
              </div>
              <Badge>{app.status}</Badge>
            </div>
            <Link
              to={`/applications/${app.id}`}
              className="inline-block mt-3 text-sm text-blue-600 hover:underline"
            >
              Перейти в заявку
            </Link>
          </Card>
        ))
      )}
    </div>
  );

  const renderKanban = () => {
    const statuses = ['pending', 'in_progress', 'done'];

    return (
      <div className="grid md:grid-cols-3 gap-4">
        {statuses.map((status) => (
          <div key={status} className="bg-gray-100 rounded-xl p-3 flex flex-col">
            <h3 className="text-md font-bold text-gray-700 mb-2">
              {status === 'pending' && 'В обработке'}
              {status === 'in_progress' && 'В процессе'}
              {status === 'done' && 'Закрыта'}
            </h3>

            {filtered
              .filter((app) => app.status === status)
              .map((app) => (
                <Card key={app.id} className="mb-3 p-4 border rounded-xl bg-white shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-800">{app.claimant?.name || '—'}</h4>
                  <p className="text-xs text-gray-500">{app.claimant?.phone_number}</p>
                  <p className="text-xs text-gray-600 mt-1">{app.data?.message}</p>
                  <Link
                    to={`/applications/${app.id}`}
                    className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                  >
                    Подробнее
                  </Link>
                </Card>
              ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-6 py-8">
      <div className="bg-white rounded-2xl shadow-xl w-full p-6 flex flex-col gap-6">
        <div className="sticky top-0 z-10 bg-white pb-4 mb-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Список заявок</h1>
              <p className="text-sm text-gray-500">Фильтрация и выбор отображения</p>
            </div>

            <div className="flex gap-3">
              <Select onValueChange={setStatusFilter} defaultValue="">
                <SelectItem value="">Все</SelectItem>
                <SelectItem value="pending">В обработке</SelectItem>
                <SelectItem value="in_progress">В процессе</SelectItem>
                <SelectItem value="done">Закрыта</SelectItem>
              </Select>

              <Select onValueChange={(val) => setViewMode(val as 'kanban' | 'table')} defaultValue="table">
                <SelectItem value="table">Таблица</SelectItem>
                <SelectItem value="kanban">Канбан</SelectItem>
              </Select>
            </div>
          </div>
        </div>

        {viewMode === 'table' ? renderTable() : renderKanban()}
      </div>
    </div>
  );
}
