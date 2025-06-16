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
import { fetchWorkflowByIdFx, updateWorkflowFx} from '@features/workflow/model';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WorkflowNode } from '@entities/Workflow/model/types';
import NodeDrawer from '../../widgets/NodeDrawer/NodeDrawer';
import { showNote } from '@shared/model/Note';

export const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const { id: workflowId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const initialDraftRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);

  // Загрузка схемы и проверка на имеющийся черновик
  useEffect(() => {
    const draft = localStorage.getItem(`workflow-draft-${workflowId}`);
    if (draft) {
      const parsed = JSON.parse(draft);
      initialDraftRef.current = parsed;
      setNodes(parsed.nodes);
      setEdges(parsed.edges);
      return;
    }

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

      const draft = { nodes: mappedNodes, edges: mappedEdges };
      initialDraftRef.current = draft;
      setNodes(mappedNodes);
      setEdges(mappedEdges);
    });
  }, [workflowId]);

  // Автосохранение черновика
  useEffect(() => {
    localStorage.setItem(`workflow-draft-${workflowId}`, JSON.stringify({ nodes, edges }));
  }, [nodes, edges, workflowId]);

  // Проверка на несохранённые изменения
  const isDirty = useMemo(() => {
    const current = JSON.stringify({ nodes, edges });
    const initial = JSON.stringify(initialDraftRef.current);
    return current !== initial;
  }, [nodes, edges]);

  // Предупреждение при закрытии вкладки
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const onConnect = (connection: Connection) =>
    setEdges((eds) => addEdge(connection, eds));

  const mapReactFlowTypeToWorkflowType = (type: string | undefined): 'start' | 'task' | 'end' => {
    if (type === 'input') return 'start';
    if (type === 'output') return 'end';
    return 'task';
  };

  const handleSave = async () => {
    const payload = {
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
        condition: "",
      }))
    };

    await updateWorkflowFx({ id: Number(workflowId), data: payload });

    initialDraftRef.current = { nodes, edges };
    navigate('/dashboard');
    showNote({
      icon: 'success',
      message: 'Схема успешно сохранилась!',
    });
  };

  // Обозначение начала и конца заявки
  const hasStart = nodes.some(n => n.type === 'input');
  const hasEnd = nodes.some(n => n.type === 'output');

  const handleNodeClick = (node: WorkflowNode) => {
    setSelectedNode(node);
  };

  // Обработчик сохранения названия ноды
  const handleNodeSave = (updatedNode: WorkflowNode) => {
    if (updatedNode.name.length < 3 || updatedNode.name.length > 12) {
      showNote({ icon: 'error', message: 'Недопустимая длина названия!' });
    } else {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === updatedNode.external_id
            ? { ...n, data: { ...n.data, label: updatedNode.name } }
            : n
        )
      );
      showNote({ icon: 'success', message: 'Название изменено!' });
    }
    setSelectedNode(null);
  };

  // Обработчик удаления ноды
  const handleNodeDelete = (nodeId: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNode(null);
  };


  return (
    <div className="h-screen w-full flex">
      <div className="w-64 p-4 border-r bg-gray-100 space-y-4 flex flex-col">
        
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
        <button onClick={handleSave} className={`bottom-2 left-2 px-1 py-2 text-sm font-medium text-center text-white rounded-lg 
        ${isDirty ? 'hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 
          'bg-blue-300 cursor-not-allowed'}`} disabled={!isDirty}>
          Сохранить
        </button>
      </div>

      <NodeDrawer node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onSave={handleNodeSave}
        onDelete={handleNodeDelete}
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

