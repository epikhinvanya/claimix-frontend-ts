import { createEvent } from "effector";

export const logout = createEvent()
export const setUser = createEvent<string>();