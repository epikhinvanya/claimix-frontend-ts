import { Workflow } from "@entities/Workflow/model/types";
import { createEvent } from "effector";

export const loadWorkflows = createEvent();
export const createWorkflow = createEvent<Workflow>();
export const deleteWorkflow = createEvent<number>();
export const setWorkflows = createEvent<Workflow[]>();
