// src/routes/AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import Loading from '../../Loading/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) return <Loading/>;

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
