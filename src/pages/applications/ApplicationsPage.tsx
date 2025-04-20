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
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .get('http://claimix.localhost:8000/api/applications/', {
  //       headers: {
  //         Authorization: 'Token 6a922ada2a4f4b81740b8079b481106547b4c51e',
  //       },
  //     })
  //     .then((res) => setApplications(res.data))
  //     .catch((err) => console.error('Ошибка загрузки заявок', err))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    const fakeData: Application[] = [
      { id: 1, title: 'Установка урн на Абая 32', status: 'Новая', role: 'client' },
      { id: 2, title: 'Уборка территории у школы №58', status: 'В процессе', role: 'manager' },
      { id: 3, title: 'Ремонт освещения на проспекте Назарбаева', status: 'Закрыта', role: 'admin' },
      { id: 4, title: 'Вывоз мусора с площадки у дома 24', status: 'Новая', role: 'manager' },
      { id: 5, title: 'Проверка жалобы на шум', status: 'Закрыта', role: 'client' },
    ];
    setApplications(fakeData);
    setLoading(false);
  }, []);
  

  const filtered = applications.filter(
    (app) =>
      (statusFilter ? app.status === statusFilter : true) &&
      (roleFilter ? app.role === roleFilter : true)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex justify-center items-start px-4 py-12">
      <Card className="w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Список заявок</h1>
        <p className="text-gray-500 mb-6 text-sm">Фильтрация по статусу и роли</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Select onValueChange={setStatusFilter} defaultValue="">
            <SelectItem value="">Все статусы</SelectItem>
            <SelectItem value="Новая">Новая</SelectItem>
            <SelectItem value="В процессе">В процессе</SelectItem>
            <SelectItem value="Закрыта">Закрыта</SelectItem>
          </Select>

          <Select onValueChange={setRoleFilter} defaultValue="">
            <SelectItem value="">Все роли</SelectItem>
            <SelectItem value="client">Клиент</SelectItem>
            <SelectItem value="manager">Менеджер</SelectItem>
            <SelectItem value="admin">Администратор</SelectItem>
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
                    <h3 className="text-md font-semibold text-gray-800">{app.title}</h3>
                    <p className="text-sm text-gray-500">Роль: {app.role}</p>
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
