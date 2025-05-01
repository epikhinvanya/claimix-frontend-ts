import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';

interface Application {
  id: number;
  status: string;
  data: {
    message: string;
  };
  tracking_code: string;
  claimant: {
    id: number;
    name: string;
    phone_number: string;
    telegram_chat_id: string | null;
    created_at: string;
  };
  created_at: string;
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchApplication = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem('token');

        const response = await axios.get(`http://test.claimix.ru/api/workflows/applications/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplication(response.data);
      } catch (err) {
        console.error('Ошибка загрузки заявки:', err);
        setError('Ошибка при загрузке заявки.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleMoveForward = async () => {
    if (!id) return;
    try {
      setMoving(true);
      const token = sessionStorage.getItem('token');

      await axios.post(`http://test.claimix.ru/api/workflows/applications/${id}/move/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Заявка успешно передвинута дальше!');
      navigate('/applications');
    } catch (err) {
      console.error('Ошибка при продвижении заявки:', err);
      alert('Ошибка при продвижении заявки.');
    } finally {
      setMoving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Детали заявки</h1>
        <Button onClick={() => navigate('/applications')} className="bg-blue-600 hover:bg-blue-700 text-white">
          Назад
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Загрузка заявки...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : application ? (
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <p><span className="font-semibold">ID заявки:</span> {application.id}</p>
              <p><span className="font-semibold">Сообщение:</span> {application.data?.message || '—'}</p>
              <p><span className="font-semibold">Телефон:</span> {application.claimant?.phone_number || '—'}</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Статус:</span> {application.status}</p>
              <p><span className="font-semibold">Код отслеживания:</span> {application.tracking_code}</p>
              <p><span className="font-semibold">Дата создания:</span> {new Date(application.created_at).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button
              onClick={handleMoveForward}
              disabled={moving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {moving ? 'Двигаем...' : 'Передвинуть заявку дальше'}
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Заявка не найдена.</p>
      )}
    </div>
  );
}
