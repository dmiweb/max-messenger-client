import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/app/providers/AuthProvider';
import { ProtectedRoute } from '@/app/router/ProtectedRoute';
import { LoginPage } from '@/pages/login-page/LoginPage';
import { ChatPage } from '@/pages/chat-page/ui/ChatPage';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/chat"
            element={<ChatPage />}
          />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/chat" replace />}
        />
      </Routes>
    </AuthProvider>
  );
}