import { useEffect, useState } from "react";
import { Workflow } from "../../entities/Workflow/model/types";
import { useNavigate } from 'react-router-dom';
import { deleteWorkflow, getWorkflows } from "../../entities/Workflow/model/storage";
import { v4 as uuidv4 } from 'uuid';

export const Workplace = () => {
    const [workflows, setWorkflows] = useState<Record<string, Workflow>>({});
    const navigate = useNavigate();

    useEffect(() => {
        setWorkflows(getWorkflows())
    }, [])

    const handleCreate = () => {
        const id = uuidv4();
        const newWf = { id, name: `New Workflow ${id}`, nodes: [], edges: [] };
        localStorage.setItem('workflows', JSON.stringify({ ...workflows, [id]: newWf }));
        navigate(`/builder/${id}`);
    }

    const handleDelete = (id: string) => {
        deleteWorkflow(id);
        setWorkflows(getWorkflows());
      };
    
      const handleOpen = (id: string) => {
        navigate(`/builder/${id}`);
      };

    return (
    <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Workflow Workplace</h1>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded">
        New Workflow
        </button>
        <div className="space-y-2">
        {Object.values(workflows).map((wf) => (
            <div key={wf.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <span>{wf.name}</span>
            <div className="space-x-2">
                <button onClick={() => handleOpen(wf.id)} className="text-blue-600">Open</button>
                <button onClick={() => handleDelete(wf.id)} className="text-red-600">Delete</button>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
}