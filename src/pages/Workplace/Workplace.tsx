import { useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { $workflows, createWorkflowFx, deleteWorkflowFx, fetchWorkflowsFx, renameWorkflowFx, setWorkflows } from "@features/workflow/model";
import { useStore } from "effector-react";

export const Workplace = () => {
    const workflows = useStore($workflows)
    const navigate = useNavigate();

    useEffect(() => {
        fetchWorkflowsFx().then(setWorkflows);
    }, [])

    const handleDelete = async (id: number) => {
        await deleteWorkflowFx(id);
        fetchWorkflowsFx().then(setWorkflows);
    }

    const handleOpen = (id: number) => {
        navigate(`/builder/${id}`)
    }

    const handleCreate = async () => {
        const name = prompt('Название нового workflow:', 'Новый Workflow');
        if (name) {
            await createWorkflowFx(name);
        }
    }

    const handleRename = async (id: number, currentName: string) => {
        const newName = prompt('Новое имя workflow:', currentName);
        if (newName && newName !== currentName) {
          await renameWorkflowFx({ id, name: newName });
          fetchWorkflowsFx();
        }
      };
      

    return (
    <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Workflow Workplace</h1>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
        New Workflow
        </button>
        <div className="space-y-2">
            {workflows.map((wf) => (
                <div key={wf.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                    <span>{wf.name}</span>
                    <div className="flex flex-row gap-2">
                    <button onClick={() => handleOpen(wf.id)} className="px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg 
                                            hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">Открыть</button>
                    <button onClick={() => handleDelete(wf.id)} className="px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg 
                                            hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800">Удалить</button>
                    <button onClick={() => handleRename(wf.id, wf.name)} className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg 
                                            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Переименовать</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}