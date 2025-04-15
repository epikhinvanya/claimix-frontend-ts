export interface EdgeEntity {
    id: string;
    condition: Record<string, any>;
    source_id: string;
    target_id: string;
    workflow_id: string;
}