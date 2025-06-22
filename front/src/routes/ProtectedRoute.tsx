import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../api/token';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = Boolean(getAuthToken());

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
