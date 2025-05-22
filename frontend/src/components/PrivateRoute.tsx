import { Navigate } from 'react-router-dom';
import { getUserData } from '../utils/getUserData';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = getUserData();

  const isAuthenticated =
    user !== null &&
    typeof user.jwt === "string" &&
    user.jwt.length > 0 &&
    user.roles?.includes("ROLE_USER");

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
