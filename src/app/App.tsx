import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { initSession } from './init';

// Страницы
import LoginPage from '../pages/login/LoginPage';
import RegisterPage from '../pages/register/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import { Workplace } from '../pages/Workplace/Workplace';
import { WorkflowBuilder } from '../pages/WorkflowBuilder/WorkflowBuilder';
import ApplicationsPage from '../pages/applications/ApplicationsPage';
import ApplicationDetailPage from '../pages/applications/ApplicationDetailPage';
import CreateApplicationPage from '../pages/createApplication/createApplicationPage';
import PublicLandingPage from '../pages/public/PublicLandingPage';

// Обёртки
import ProtectedRoute from '../shared/ui/ProtectedRoute';
import AuthRedirect from '../shared/ui/AuthRedirect';
import { AppLayout } from '../shared/layouts/AppLayout';

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

        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/new-application" element={<CreateApplicationPage />} />

        <Route element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/applications/:id" element={<ApplicationDetailPage />} />
          <Route path="/workplace" element={<Workplace />} />
          <Route path="/builder/:id" element={
            <ReactFlowProvider>
              <WorkflowBuilder />
            </ReactFlowProvider>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
