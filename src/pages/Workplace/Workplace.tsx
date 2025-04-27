import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useStore } from "effector-react";
import { $workflows, createWorkflowFx, deleteWorkflowFx, fetchWorkflowsFx, renameWorkflowFx, setWorkflows } from "../../features/workflow/model";

export const Workplace = () => {
  const workflows = useStore($workflows);
  const navigate = useNavigate();

  const [newWorkflowName, setNewWorkflowName] = useState('');
  const [renameId, setRenameId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState('');

  useEffect(() => {
    fetchWorkflowsFx().then(setWorkflows);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteWorkflowFx(id);
    fetchWorkflowsFx().then(setWorkflows);
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

  const handleStartRename = (id: number, currentName: string) => {
    setRenameId(id);
    setRenameValue(currentName);
  };

  const handleRename = async () => {
    if (renameId !== null && renameValue.trim() !== '') {
      await renameWorkflowFx({ id: renameId, name: renameValue.trim() });
      setRenameId(null);
      setRenameValue('');
      fetchWorkflowsFx().then(setWorkflows);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Рабочее пространство Workflow</h1>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Введите название workflow"
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
          <div key={wf.id} className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm">
            <div className="flex-1">
              {renameId === wf.id ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="p-2 border rounded-lg flex-1"
                  />
                  <button
                    onClick={handleRename}
                    className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setRenameId(null)}
                    className="px-3 py-2 text-sm font-medium text-white bg-gray-400 rounded-lg hover:bg-gray-500"
                  >
                    Отмена
                  </button>
                </div>
              ) : (
                <span className="text-gray-800 font-medium">{wf.name}</span>
              )}
            </div>

            <div className="flex gap-2 ml-4">
              <button
                onClick={() => handleOpen(wf.id)}
                className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                Открыть
              </button>
              <button
                onClick={() => handleDelete(wf.id)}
                className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Удалить
              </button>
              <button
                onClick={() => handleStartRename(wf.id, wf.name)}
                className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Переименовать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
