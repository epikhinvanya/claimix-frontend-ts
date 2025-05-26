import { Workflow } from "@entities/Workflow/model/types";
import api from "@shared/api/axiosInstance";
import { createEffect } from "effector";

{/* Получаем все схемы */}
export const fetchWorkflowsFx = createEffect(async () => {
    const res = await api.get<Workflow[]>('/api/workflows/workflows-short/short/');
    return res.data;
})

{/* Получаем одну схему по id */}
export const fetchWorkflowByIdFx = createEffect(async (id: number) => {
    const res = await api.get(`/api/workflows/workflows/${id}/`)
    console.log(res.data)
    return res.data;
})

{/* Создаем пустую схему */}
export const createWorkflowFx = createEffect(async (name: string): Promise<Workflow> => {
    const workflowBody = {
        name,
        nodes: [],
        edges: [],
    }
    
    const res = await api.post('/api/workflows/workflows/', workflowBody);
    return res.data;
})

{/* Переименование схемы, можно дороботать изминения схему тут */}
export const renameWorkflowFx = createEffect(async ({id, name}: {id: number, name: string }) => {
    await api.patch(`/api/workflows/workflows/${id}/`, {name});
})

{/* Удаление одной схемы по id */}
export const deleteWorkflowFx = createEffect(async (id: number) => {
    await api.delete(`/api/workflows/workflows/${id}/`)
    return id;
})

{/* Сохранения схемы после изминений внутри */}
export const updateWorkflowFx = createEffect(
    async ({ id, data }: { id: number; data: Partial<Workflow> }) => {
      const res = await api.patch(`/api/workflows/workflows/${id}/`, data);
      return res.data;
    }
);