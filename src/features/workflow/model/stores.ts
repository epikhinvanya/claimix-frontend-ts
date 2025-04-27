import { createEvent, createStore, sample } from "effector";
import { Workflow } from "@entities/Workflow/model/types";
import { createWorkflowFx, fetchWorkflowsFx } from "./effects";


export const $workflows = createStore<Workflow[]>([]);
export const setWorkflows = createEvent<Workflow[]>();

$workflows.on(setWorkflows, (_, payload) => payload);

sample({
  clock: fetchWorkflowsFx.doneData,
  target: setWorkflows,
});

sample({
  clock: createWorkflowFx.doneData,
  source: $workflows,
  fn: (workflows, newWorkflow) => [...workflows, newWorkflow],
  target: setWorkflows,
});