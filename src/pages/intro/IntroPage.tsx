import { useNavigate } from "react-router-dom";


function IntroPage() {
    const navigate = useNavigate()


    return(
        <div className="min-h-screen bg-[#f5f6fa] px-6 py-8 content-center">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-6 items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Добро пожаловать в Claimix!</h1>
                    <h2 className="text-2xl font-bold text-gray-800">Что вы хотите сделать?</h2>
                    <div className="flex flex-row gap-6">
                        <button onClick={() => navigate('/search')} className="flex-1 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 
                        dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 font-medium py-3 px-6 rounded-lg transition">
                            Подать заявку
                        </button>
                        <button onClick={() => navigate('/login')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition">
                            Обработать заявку
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroPage;