import { $note, closeNote } from "@shared/model/Note";
import { useUnit } from "effector-react";
import { useEffect } from "react";



export const Note = () => {
    const note = useUnit($note)

    useEffect(() => {
        if (note) {
        const timer = setTimeout(() => {
            closeNote();
            note.onClose?.();
        }, 4000);

        return () => clearTimeout(timer);
        }
    }, [note]);

    if (!note) return null;

    const handleClose = () => {
        closeNote()
    }

    const iconMap = {
        success: (
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-400 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
        </div>
        ),
        error: (
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-red-400 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
            </svg>
        </div>
        ),
        info: (
        <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-400 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
        </div>
        ),
        };

    return(
        <div
        className="fixed top-4 right-4 flex items-center w-full max-w-xs p-4 bg-white/50 text-gray-700 rounded-lg shadow-sm dark:text-gray-600 animate-slide-in"
        role="alert"
        >
            {iconMap[note.icon]}
            <div className="ml-3 text-sm font-normal">{note.message}</div>
            <button
                onClick={() => {
                closeNote();
                note.onClose?.();
                }}
                className="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
                aria-label="Close"
            >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    )
}