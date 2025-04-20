import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import axios from 'axios';

import { Textarea } from '../../components/ui/textarea';
import { Select, SelectItem } from '../../components/ui/select';
import { Button } from '../../components/ui/button';


export default function CreateApplicationPage() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e:
    React.FormEvent) => {

    e.preventDefault();

    if(!phone || !name  || !comment) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const payload = {
        workflow: 1,
        data: {
            message: comment,
        },
        phone_number: phone,
        name: name,
    };


    try {
        await axios.post('http://test.claimix.ru/api/workflows/applications/', payload)
        console.log('Данные успешно отправлены:', payload);
        } catch (error) {
        console.error('Ошибка при отправке данных:', error);
    };
  };

  

  return (
    <div>
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex justify-center items-start px-4 py-12">
            <Card className="w-full max-w-5xl p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Создание заявки</h1>
            <p className="text-gray-500 mb-6 text-sm">Пожалуйста, заполните все поля.</p>
    
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                type="text"
                placeholder="Ваш телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                />
                <Input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                required
                />
                <Select onValueChange={setType} defaultValue="" required>
                <SelectItem value="">Выберите тип заявки</SelectItem>
                </Select>
                <Textarea
                placeholder="Комментарий"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                />
                <Button type="submit" className="w-full mt-4">Отправить заявку</Button>
            </form>
            </Card>
        </div>
    </div>
  );
}