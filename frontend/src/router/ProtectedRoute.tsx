import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { getAccessToken } from '@/utils/tokenManager';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getAccessToken();
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
