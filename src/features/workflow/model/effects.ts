import { Workflow } from "@entities/Workflow/model/types";
import api from "@shared/api/axiosInstance";
import { createEffect } from "effector";


export const fetchWorkflowsFx = createEffect(async () => {
    const res = await api.get<Workflow[]>('/api/workflows/workflows-short/short/');
    return res.data;
})

export const fetchWorkflowByIdFx = createEffect(async (id: number) => {
    const res = await api.get(`/api/workflows/workflows/${id}/`)
    console.log(res.data)
    return res.data;
})

export const createWorkflowFx = createEffect(async (name: string): Promise<Workflow> => {
    const workflowBody = {
        name,
        nodes: [],
        edges: [],
    }
    
    const res = await api.post('/api/workflows/workflows/', workflowBody);
    return res.data;
})

export const renameWorkflowFx = createEffect(async ({id, name}: {id: number, name: string }) => {
    await api.patch(`/api/workflows/workflows/${id}/`, {name});
})

export const deleteWorkflowFx = createEffect(async (id: number) => {
    await api.delete(`/api/workflows/workflows/${id}/`)
    return id;
})

export const updateWorkflowFx = createEffect(
    async ({ id, data }: { id: number; data: Partial<Workflow> }) => {
      const res = await api.patch(`/api/workflows/workflows/${id}/`, data);
      return res.data;
    }
  );