import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

// Страницы авторизации
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';

// Страницы workflow
import { Workplace } from '../pages/Workplace/Workplace';
import { WorkflowBuilder } from '../pages/WorkflowBuilder/WorkflowBuilder';

// Обёртки
import ProtectedRoute from '../shared/ui/ProtectedRoute';
import AuthRedirect from '../shared/ui/AuthRedirect';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={
          <AuthRedirect>
            <LoginPage />
          </AuthRedirect>
        } />
        <Route path="/register" element={
          <AuthRedirect>
            <RegisterPage />
          </AuthRedirect>
        } />

        {/* Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        {/* Workflow */}
        <Route path="/" element={
          <ProtectedRoute>
            <Workplace />
          </ProtectedRoute>
        } />
        <Route path="/builder/:id" element={
          <ProtectedRoute>
            <ReactFlowProvider>
              <WorkflowBuilder />
            </ReactFlowProvider>
          </ProtectedRoute>
        } />

        {/* Redirect fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
