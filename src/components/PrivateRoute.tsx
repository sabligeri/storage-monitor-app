import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('jwt-response');

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
