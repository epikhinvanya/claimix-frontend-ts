import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectItem } from '../../components/ui/select';
import { Button } from '../../components/ui/button';

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const [action, setAction] = useState('');
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex justify-center items-start px-4 py-12">
      <Card className="w-full max-w-3xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Заявка #{id}</h1>

        <Tabs defaultValue="data">
          <TabsList className="mb-4">
            <TabsTrigger value="data">Данные</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
            <TabsTrigger value="action">Ответ</TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            <p className="text-sm text-gray-600">Здесь будут данные заявки</p>
          </TabsContent>

          <TabsContent value="history">
            <ul className="text-sm list-disc pl-5 text-gray-600">
              <li>Создана</li>
              <li>Обработана</li>
              <li>Передана</li>
            </ul>
          </TabsContent>

          <TabsContent value="action">
            <form className="space-y-3">
              <Textarea
                placeholder="Комментарий..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Select onValueChange={setAction} defaultValue="">
                <SelectItem value="">Выбрать действие</SelectItem>
                <SelectItem value="approve">Одобрить</SelectItem>
                <SelectItem value="decline">Отклонить</SelectItem>
              </Select>
              <Button type="submit">Перевести дальше</Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
