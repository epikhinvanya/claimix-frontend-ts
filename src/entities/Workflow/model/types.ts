import { Node, Edge } from 'reactflow';

export interface Workflow {
    id: number,
    name: string,
    nodes?: WorkflowNode[],
    edges?: WorkflowEdge[],
}

export interface WorkflowNode {
    external_id: string,
    name: string,
    type: 'start' | 'task' | 'end',
    position: {x:number; y:number},
    assigned_role: string | null,
    action: string | null
}

export interface WorkflowEdge {
    source: string,
    target: string,
    condition: string | null;
}