export type NodeType = 'start' | 'task' | 'end' | 'decision';

export interface NodeEntity {
  id: string;
  external_id: string;
  name: string;
  type: NodeType;
  position: { x: number; y: number };
  assigned_role: string;
  action: Record<string, any>;
  workflow_id: string;
}