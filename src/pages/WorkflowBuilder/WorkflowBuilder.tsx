import { useNavigate, useParams } from 'react-router-dom';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Node,
  useEdgesState,
  useNodesState,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { fetchWorkflowByIdFx, updateWorkflowFx, updateNodeFx } from '@features/workflow/model';
import { useEffect, useState } from 'react';
import { WorkflowNode } from '@entities/Workflow/model/types';
import NodeDrawer from './NodeDrawer';

export const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const { id: workflowId, name: workflowName } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null)

  // Рендер nodes и edges по id для выбранного workflow
  useEffect(() => {
    if (!workflowId) return;

    fetchWorkflowByIdFx(Number(workflowId)).then(({ nodes, edges }) => {
      const mappedNodes: Node[] = (nodes || []).map((n: { external_id: any; position: any; type: string; name: any; }) => ({
        id: n.external_id,
        position: n.position,
        type:
          n.type === 'start'
            ? 'input'
            : n.type === 'end'
            ? 'output'
            : 'default',
        data: { label: n.name },
      }));

      const labelToIdMap: Record<string, string> = {};
      for (const n of nodes) {
        const label = `${n.name} (${n.type})`;
        labelToIdMap[label] = n.external_id;
      }

      const mappedEdges: Edge[] = (edges || []).map((e: { source: string | number; target: string | number; }) => ({
        id: `${labelToIdMap[e.source]}-${labelToIdMap[e.target]}`,
        source: labelToIdMap[e.source],
        target: labelToIdMap[e.target],
      }));

      setNodes(mappedNodes);
      setEdges(mappedEdges);
      });
  }, [workflowId]);


  const onConnect = (connection: Connection) =>
    setEdges((eds) => addEdge(connection, eds));

  const mapReactFlowTypeToWorkflowType = (type: string | undefined): 'start' | 'task' | 'end' => {
    if (type === 'input') return 'start';
    if (type === 'output') return 'end';
    return 'task';
  };

  // Хэндлер для сохранения nodes и edges на бэк
  const handleSave = async () => {
    console.log({workflowName, nodes, edges})
    const payload = {
      id: Number(workflowId),
      name: workflowName,
      nodes: nodes.map(n => ({
        external_id: n.id,
        name: n.data.label,
        type: mapReactFlowTypeToWorkflowType(n.type),
        position: n.position,
        assigned_role: null,
        action: null,
      })),
      edges: edges.map(e => ({
        source: e.source,
        target: e.target,
        condition: "" ,
      }))
    };
  
    await updateWorkflowFx({ id: Number(workflowId), data: payload });
    navigate('/dashboard');
  };


  // Проверка на существующии nodes на схеме
  const hasStart = nodes.some(n => n.type === 'input');
  const hasEnd = nodes.some(n => n.type === 'output')

  // Swipper NodeDrawer ЛОГИКА
  const handleNodeClick = (node: WorkflowNode) => {
      setSelectedNode(node);
  }

  const handleNodeSave = async (updatedNode: WorkflowNode) => {
    if (!workflowId) return;

    await updateNodeFx({
      workflowId: Number(workflowId),
      nodeId: updatedNode.external_id,
      newName: updatedNode.name,
    });

    setNodes((nds) =>
      nds.map((n) =>
        n.id === String(updatedNode.external_id)
          ? { ...n, data: { ...n.data, label: updatedNode.name } }
          : n
      )
    );

    setSelectedNode(null);
  };

  const handleNodeDelete = (nodeId: number) => {
    setSelectedNode(null)
  }


  return (
    <div className="h-screen w-full flex">
      <div className="w-64 p-4 border-r bg-gray-100 space-y-4 flex flex-col">
        <h2 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Toolbar</h2>
        
        {/* Кнопки создания сущностей на схеме*/}
        <button
          disabled={hasStart}
          onClick={() => {
            const newNode: Node = {
              id: crypto.randomUUID(),
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: { label: 'Start Node' },
              type: 'input',
            };
            setNodes((nds) => [...nds, newNode]);
          }}
          className={`px-4 py-2 rounded text-white ${hasStart ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        >
          Добавить Start
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
          Добавить Задачу
        </button>

        <button
          onClick={() => {
            const hasEnd = nodes.some(n => n.type === 'output');
            if (hasEnd) {
              alert('Можно добавить только один стартовый узел.');
              return;
            }
            const newNode: Node = {
              id: crypto.randomUUID(),
              position: { x: Math.random() * 200, y: Math.random() * 200 },
              data: { label: 'End Node' },
              type: 'output',
            };
            setNodes((nds) => [...nds, newNode]);
            }}
            disabled={hasEnd}
            className={`px-4 py-2 rounded text-white ${hasEnd ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
        >
          Добавить End
        </button>
        <button onClick={handleSave} className='bottom-2 left-2 px-1 py-2 text-sm font-medium text-center text-white bg-white rounded-lg 
        hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Сохранить
        </button>
      </div>

      <NodeDrawer node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSave={handleNodeSave}
      />

      {/* React Flow Canvas */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => {
            const workflowNode: WorkflowNode = {
              external_id: node.id,
              name: node.data.label || "",
              type: mapReactFlowTypeToWorkflowType(node.type),
            };
            setSelectedNode(workflowNode);
          }}
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
