import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Errors = {
  phone?: string;
  name?: string;
  comment?: string;
};

type ApiResponse = {
  tracking_code: string;
};

export default function CreateApplicationPage() {
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('repair');
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!name.trim()) newErrors.name = 'Введите имя';
    if (!comment.trim()) newErrors.comment = 'Введите комментарий';
    if (!phone || phone.replace(/\D/g, '').length < 11) newErrors.phone = 'Неверный номер';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response: AxiosResponse<ApiResponse> = await axios.post(
        'http://test.claimix.ru/api/workflows/applications/',
        {
          workflow: 1,
          data: { message: comment },
          phone_number: '+' + phone.replace(/\D/g, ''),
          name,
        }
      );

      const tracker = response.data.tracking_code;

      setPhone('');
      setName('');
      setType('repair');
      setComment('');
      setErrors({});

      toast.success(
        <span>
          Заявка отправлена! <br />
          <a
            href={`https://test.claimix.ru/track/${tracker}`}
            className="underline text-blue-300"
            target="_blank"
            rel="noreferrer"
          >
            Перейти к заявке
          </a>
        </span>,
        { autoClose: 10000, position: 'bottom-center' }
      );
    } catch (error) {
      toast.error('Ошибка при отправке');
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center px-4 py-12">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Создание заявки</h2>
        <p className="text-sm text-gray-500 mb-6">Все поля обязательны для заполнения.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <PhoneInput
              country="ru"
              value={phone}
              onChange={(value: string) => setPhone(value)}
              inputClass="!w-full !py-2 !px-11 !border !rounded-lg !text-sm"
              inputStyle={{ width: '100%' }}
              specialLabel=""
              masks={{ ru: '(...) ...-..-..' }}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500"
          >
            <option value="repair">Ремонт</option>
            <option value="cleaning">Уборка</option>
            <option value="lighting">Освещение</option>
          </select>

          <div>
            <textarea
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 ring-blue-500"
            />
            {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
}
