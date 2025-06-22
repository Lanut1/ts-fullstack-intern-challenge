import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { AppLayout } from '../components/Layout/AppLayout';
import { LoginPage } from '../pages/LoginPage';
import { AllCatsPage } from '../pages/AllCatsPage';
import { FavoritesPage } from '../pages/FavouritesPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<AllCatsPage />} />

        <Route path="favorites" element={<FavoritesPage />} />

      </Route>

      <Route path="*" element={<h1>404: Страница не найдена</h1>} />
    </Routes>
  );
}
