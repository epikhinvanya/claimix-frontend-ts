import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button"; 
import { ClipboardList, FileText, LayoutDashboard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export function Sidebar() {
  const navigate = useNavigate();
  const [subdomain, setSubdomain] = useState<string>('Claimix');

  useEffect(() => {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length > 2) {
      setSubdomain(parts[0]);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition 
    ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'}`;

  return (
    <div className="h-full w-full bg-white border-r border-gray-200 flex flex-col p-6 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800 capitalize">{subdomain}</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18} /> Панель управления
        </NavLink>
        <NavLink to="/applications" className={linkClass}>
          <FileText size={18} /> Все заявки
        </NavLink>
        <NavLink to="/workplace" className={linkClass}>
          <ClipboardList size={18} /> Схемы
        </NavLink>
      </nav>

      <div className="pt-6 border-t border-gray-200">
        <Button
          onClick={handleLogout}
          className="w-full flex items-center justify-start gap-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} /> Выйти
        </Button>
      </div>
    </div>
  );
}
