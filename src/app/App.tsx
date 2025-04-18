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


import ApplicationsPage from '../pages/applications/ApplicationsPage';
import ApplicationDetailPage from '../pages/applications/ApplicationDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/applications" element={<ApplicationsPage />} />
        {/* <Route path="/applications/:id" element={<ApplicationDetailPage />} /> */}
        <Route path="/applications1" element={<ApplicationDetailPage />} />

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

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
