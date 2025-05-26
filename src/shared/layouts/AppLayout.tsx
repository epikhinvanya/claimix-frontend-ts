import { ConfirmModal } from "@shared/ui/ConfirmModal";
import { Sidebar } from "../../widgets/Sidebar/Sidebar"; 
import { Outlet } from "react-router-dom";
import { Note } from "@shared/ui/Note";

export function AppLayout() {
  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      <aside className="h-screen w-64 shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 px-8 overflow-x-hidden overflow-y-auto">
        <Outlet />
      </main>
      <ConfirmModal/>
      <Note/>
    </div>
  );
}
