import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectItem } from '../../components/ui/select';
import { Button } from '../../components/ui/button';

interface Application {
  id: number;
  title: string;
  description: string;
  status: string;
  role: string;
  history: {
    date: string;
    action: string;
    by: string;
  }[];
}

const FAKE_DATA: Application[] = [
  {
    id: 1,
    title: 'Установка урн на Абая 32',
    description: 'Необходимо установить урны у подъездов дома.',
    status: 'Новая',
    role: 'client',
    history: [
      { date: '2024-04-01', action: 'Создана', by: 'Иван' },
      { date: '2024-04-02', action: 'Передана на рассмотрение', by: 'Администратор' },
    ],
  },
  {
    id: 2,
    title: 'Уборка территории у школы №58',
    description: 'Поступила жалоба на мусор возле школы.',
    status: 'В процессе',
    role: 'manager',
    history: [
      { date: '2024-04-03', action: 'Создана', by: 'Пользователь' },
      { date: '2024-04-04', action: 'Назначен исполнитель', by: 'Менеджер' },
    ],
  },
  {
    id: 3,
    title: 'Ремонт освещения на проспекте Назарбаева',
    description: 'Несколько фонарей не работают.',
    status: 'Закрыта',
    role: 'admin',
    history: [
      { date: '2024-04-05', action: 'Создана', by: 'Житель' },
      { date: '2024-04-06', action: 'Передана', by: 'Оператор' },
      { date: '2024-04-07', action: 'Закрыта', by: 'Исполнитель' },
    ],
  },
];

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [action, setAction] = useState('');
  const [comment, setComment] = useState('');
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const app = FAKE_DATA.find((item) => item.id === Number(id));
    setApplication(app || null);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f5f6fa] px-6 py-10 flex justify-center">
      <Card className="w-full max-w-4xl p-8 rounded-2xl shadow-xl bg-white space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Заявка #{id} {application ? `— ${application.title}` : ''}
        </h1>

        <Tabs defaultValue="data" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="data">Данные</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
            <TabsTrigger value="action">Ответ</TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            {application ? (
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Описание:</strong> {application.description}</p>
                <p><strong>Статус:</strong> {application.status}</p>
                <p><strong>Роль:</strong> {application.role}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Заявка не найдена.</p>
            )}
          </TabsContent>

          <TabsContent value="history">
            {application?.history?.length ? (
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                {application.history.map((entry, index) => (
                  <li key={index}>
                    <span className="text-gray-800 font-medium">{entry.date}</span> — {entry.action} ({entry.by})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">История отсутствует.</p>
            )}
          </TabsContent>

          <TabsContent value="action">
            <form className="space-y-4">
              <Textarea
                placeholder="Комментарий..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] text-sm w-100"
              />
              <Select onValueChange={setAction} defaultValue="">
                <SelectItem value="">Выбрать действие</SelectItem>
                <SelectItem value="approve">Одобрить</SelectItem>
                <SelectItem value="decline">Отклонить</SelectItem>
              </Select>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Перевести дальше
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
