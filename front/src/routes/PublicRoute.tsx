import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../api/token';

interface PublicRouteProps {
  children: React.ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = Boolean(getAuthToken());

  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
