import {WorkflowNode} from '@entities/Workflow/model/types'
import { updateNodeFx } from '@features/workflow/model';
import { useEffect, useState } from 'react';

type NodeDrawerProps = {
    node: WorkflowNode | null;
    onClose: () => void;
    onSave: (updatedNode: WorkflowNode) => void;
}

const NodeDrawer: React.FC<NodeDrawerProps> = ({node, onClose, onSave}) => {
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        if (node) {
            setName(node.name)
            setType(node.type)
        }
    }, [node])

    if (!node) return null

    return(
        <div
            className={`fixed top-0 right-0 w-80 h-screen border-r bg-gray-100 shadow-lg z-50 border-l p-4 transition-transform duration-300
            ${node ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Настройка процесса</h5>
            <button onClick={onClose} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
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
                value={type}
                disabled
                />

                <button
                onClick={() => onSave({ ...node, name })}
                className="bottom-2 left-2 px-1 py-2 text-sm font-medium text-center text-white bg-white rounded-lg 
                hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Сохранить
                </button>
            </div>
        </div>
    )
}

export default NodeDrawer;