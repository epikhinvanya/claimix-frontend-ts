import {WorkflowNode} from '@entities/Workflow/model/types'
import { useEffect, useState } from 'react';

type NodeDrawerProps = {
  node: WorkflowNode | null;
  onClose: () => void;
  onSave: (updatedNode: WorkflowNode) => void;
  onDelete: (nodeId: string) => void;
};

const NodeDrawer: React.FC<NodeDrawerProps> = ({ node, onClose, onSave, onDelete }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (node) {
      setName(node.name);
    }
  }, [node]);

  if (!node) return null;

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-screen border-r bg-gray-100 shadow-lg z-50 p-4 transition-transform duration-300
      ${node ? "translate-x-0" : "translate-x-full"}`}
    >
      <h5 className="text-base font-semibold text-gray-500 uppercase">Настройка процесса</h5>
      <button
        onClick={onClose}
        type="button"
        aria-controls="drawer-navigation"
        className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
      >
        ✕
      </button>

      <div className="flex flex-col gap-2 py-4 overflow-y-auto">
        <label className="text-sm font-medium">Название</label>
        <input
          className="border rounded px-2 py-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="text-sm font-medium mt-2">Тип процесса</label>
        <input
          className="border rounded px-2 py-1"
          value={node.type}
          disabled
        />

        <button
          onClick={() => onSave({ ...node, name })}
          className="bottom-2 left-2 px-1 py-2 text-sm font-medium text-center text-white bg-white rounded-lg 
        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Изменить
        </button>
        <button
          onClick={() => onDelete(node.external_id)}
          className="bottom-2 left-2 px-1 py-2 text-sm font-medium text-center text-white bg-white rounded-lg 
        hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default NodeDrawer;