import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import { updateWorkflowFx } from '@features/workflow/model';

export const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const { id: workflowId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = (connection: Connection) =>
    setEdges((eds) => addEdge(connection, eds));

  const mapReactFlowTypeToWorkflowType = (type: string | undefined): 'start' | 'task' | 'end' => {
    if (type === 'input') return 'start';
    if (type === 'output') return 'end';
    return 'task';
  };

  const handleSave = async () => {
    console.log({nodes, edges})
    const payload = {
      nodes: nodes.map(n => ({
        external_id: n.id,
        name: n.data.label,
        type: mapReactFlowTypeToWorkflowType(n.type),
        position: n.position,
        assign_role: null,
        action: null,
      })),
      edges: edges.map(e => ({
        source: e.source,
        target: e.target,
        condition: null,
      }))
    };
  
    await updateWorkflowFx({ id: Number(workflowId), data: payload });
    navigate('/dashboard');
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-64 p-4 border-r bg-gray-100 space-y-4 flex flex-col">
        <h2 className="text-lg font-semibold">Toolbar</h2>
        
        <button
          onClick={() => {
            const newNode: Node = {
              id: crypto.randomUUID(),
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: { label: 'Start Node' },
              type: 'input',
            };
            setNodes((nds) => [...nds, newNode]);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Start
        </button>

        <button
          onClick={() => {
            const newNode: Node = {
              id: crypto.randomUUID(),
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: { label: 'Task Node' },
              type: 'default',
            };
            setNodes((nds) => [...nds, newNode]);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>

        <button
          onClick={() => {
            const newNode: Node = {
              id: crypto.randomUUID(),
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: { label: 'End Node' },
              type: 'output',
            };
            setNodes((nds) => [...nds, newNode]);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Add End
        </button>
        <button onClick={handleSave} className='bottom-2 left-2 px-1 py-2 text-sm font-medium text-center text-white bg-white rounded-lg 
                                            hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Сохранить
        </button>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};
