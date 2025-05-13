import { $modal, closeModal } from "@shared/model/ConfirmModal";
import { useUnit } from "effector-react";
import { useState } from "react";
import { X } from 'lucide-react'


export const ConfirmModal = () => {
    const modal = useUnit($modal)
    const [inputValue, setInputValue] = useState('')

    if (!modal) return null;

    const handleConfirm = () => {
        modal.onConfirm(inputValue || undefined)
        closeModal()
        setInputValue('')
    }

    const handleClose = () => {
        closeModal()
        setInputValue('')
    }

    return(
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-lg font-bold">{modal.title}</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-black" title="Закрыть окно"><X size={20}/></button>
            </div>

            <div className="mt-4">
            <p className="mb-4 text-gray-700">{modal.message}</p>

            {modal.inputPlaceholder && (
                <input
                type="text"
                placeholder={modal.inputPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
                />
            )}
            </div>

            <div className="flex justify-end gap-2">
            <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
            >
                {modal.cancelText || 'Отмена'}
            </button>
            <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
                {modal.confirmText || 'Подтвердить'}
            </button>
            </div>
        </div>
    </div>
    )
}