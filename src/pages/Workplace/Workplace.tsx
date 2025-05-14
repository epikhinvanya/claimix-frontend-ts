import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUnit } from "effector-react";
import { $workflows, createWorkflowFx, deleteWorkflowFx, fetchWorkflowsFx, renameWorkflowFx, setWorkflows } from "../../features/workflow/model";
import { openModal } from "@shared/model/ConfirmModal";
import { Workflow } from "@entities/Workflow/model/types";
import { ExternalLink, Trash, Settings } from "lucide-react";

export const Workplace = () => {
  const workflows = useUnit($workflows);
  const navigate = useNavigate();

  const [newWorkflowName, setNewWorkflowName] = useState('');

  useEffect(() => {
    fetchWorkflowsFx().then(setWorkflows);
  }, []);

  const handleDelete = async (id: number) => {
    openModal({
    title: 'Удаление схемы',
    message: 'Вы действительно хотите удалить схему? Это действие необратимо.',
    confirmText: 'Удалить',
    cancelText: 'Отмена',
    onConfirm: async () => {
      await deleteWorkflowFx(id);
      await fetchWorkflowsFx().then(setWorkflows);
    },
    });
  };

  const handleOpen = (id: number) => {
    navigate(`/builder/${id}`);
  };

  const handleCreate = async () => {
    if (newWorkflowName.trim() !== '') {
      await createWorkflowFx(newWorkflowName.trim());
      setNewWorkflowName('');
      fetchWorkflowsFx().then(setWorkflows);
    }
  };

  const handleRename = async (wf: Workflow) => {
  openModal({
    title: 'Переименнование схемы',
    confirmText: 'Сохранить',
    cancelText: 'Отмена',
    inputPlaceholder: 'Новое название',
    onConfirm: async (value) => {
      if (value?.trim()) {
        await renameWorkflowFx({ id: wf.id, name: value.trim() });
        fetchWorkflowsFx().then(setWorkflows);
      }
    },
  });
};

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Рабочее пространство схем</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Введите название схемы"
          value={newWorkflowName}
          onChange={(e) => setNewWorkflowName(e.target.value)}
          className="p-2 border rounded-lg flex-1"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Создать
        </button>
      </div>

      <div className="space-y-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm"
          >
            <div className="flex-1">
              <span className="text-gray-800 font-medium">{wf.name}</span>
            </div>

            <div className="flex gap-2 ml-4">
              <button
                title="Открыть схему"
                onClick={() => handleOpen(wf.id)}
                className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                <ExternalLink size={20}/>
              </button>
              <button
                title="Удалить схему"
                onClick={() => handleDelete(wf.id)}
                className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                <Trash size={20}/>
              </button>
              <button
                title="Настройки схемы"
                onClick={() => handleRename(wf)}
                className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                <Settings size={20}/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};
