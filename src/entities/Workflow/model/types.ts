import { Node, Edge } from 'reactflow';

export type Workflow = {
    id: string;
    name: string;
    nodes: Node[];
    edges: Edge[];
}