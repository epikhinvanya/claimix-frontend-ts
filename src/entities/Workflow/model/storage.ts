import { Workflow } from './types'

const STORAGE_KEY = 'workflows';

export const getWorkflows = (): Record<string, Workflow> => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
}

export const saveWorkflow = (wf: Workflow) => {
    const all = getWorkflows();
    all[wf.id] = wf;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export const deleteWorkflow = (id: string) => {
    const all = getWorkflows();
    delete all[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}