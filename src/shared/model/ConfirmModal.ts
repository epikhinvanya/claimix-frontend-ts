import { createEvent, createStore } from "effector";

type ModalPayload = {
    title: string;
    message?: string;
    inputPlaceholder?: string;
    confirmText: string;
    cancelText: string;
    onConfirm: (value?: any) => void;
}

export const openModal = createEvent<ModalPayload>();
export const closeModal = createEvent();

export const $modal = createStore<ModalPayload | null>(null)
    .on(openModal, (_, payload) => payload)
    .reset(closeModal);