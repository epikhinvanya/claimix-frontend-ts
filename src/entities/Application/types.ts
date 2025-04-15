export interface Application {
    id: string;
    status: 'in_progress' | 'completed';
    data: Record<string, any>;
    assigned_to_id: string | null;
    current_node_id: string;
    workflow_id: string;
  }