import { createEvent, createStore } from "effector";

type NotePayload = {
    icon: "success" | "error" | "info";
    message?: string;
    onClose?: () => void;
}

export const showNote = createEvent<NotePayload>();
export const closeNote = createEvent();

export const $note = createStore<NotePayload | null>(null)
    .on(showNote, (_, payload) => payload)
    .reset(closeNote);