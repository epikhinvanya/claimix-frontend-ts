import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Select, SelectItem } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import axios from 'axios';

interface Application {
  id: number;
  title: string;
  status: string;
  role: string;
}

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://test.claimix.ru/api/workflows/applications/', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1NDI1MzY4LCJpYXQiOjE3NDU0MjM1NjgsImp0aSI6IjYxMDY3YmUwYWNmMTQzNTJhM2Q5NjdkNjljMzg5MjVhIiwidXNlcl9pZCI6MX0.2qz7hM-Z-IxQ8NgPcMeB7vciQtduI-Mh_-kCk8bga_0',
        },
      })
      .then((res) => setApplications(res.data))
      .catch((err) => console.error('Ошибка загрузки заявок', err))
      .finally(() => setLoading(false));
  }, []);


  const filtered = applications.filter(
    (app) =>
      (statusFilter ? app.status === statusFilter : true) 
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex justify-center items-start px-4 py-12">
      <Card className="w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Список заявок</h1>
        <p className="text-gray-500 mb-6 text-sm">Фильтрация по статусу и роли</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select onValueChange={setStatusFilter} defaultValue="">
            <SelectItem value="">Все статусы</SelectItem>
            <SelectItem value="pending">В обработке</SelectItem>
            <SelectItem value="in_progress">В процессе</SelectItem>
            <SelectItem value="done">Закрыта</SelectItem>
          </Select>

          
        </div>

        <div className="space-y-4 h-[500px] overflow-y-auto pr-1">
          {loading ? (
            <p className="text-sm text-gray-500">Загрузка заявок...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-500">Заявки не найдены.</p>
          ) : (
            filtered.map((app) => (
              <Card key={app.id} className="p-4 hover:bg-gray-50 border border-gray-200 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-md font-semibold text-gray-800">{app.claimant.name}</h3>
                    <p className="text-sm text-gray-500">{app.claimant.phone_number}</p>
                    <p className="text-sm text-gray-600 mt-1">Текст: {app.data.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Подана: {new Date(app.created_at).toLocaleString()}
                    </p>
                  </div>

                  <Badge>{app.status}</Badge>
                </div>
                <Button
                  variant="link"
                  className="mt-2 px-0 text-sm text-yellow-600 hover:underline"
                  onClick={() => window.location.href = `/applications/${app.id}`}
                >
                  Перейти в заявку
                </Button>
              </Card>
            ))
          )}
        </div>

      </Card>
    </div>
  );
}
