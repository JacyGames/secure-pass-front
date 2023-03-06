import {Navigate, Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({user, redirectPath ='/home', isAuthorized}) => {
  if (isAuthorized ? !!user : !user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  user: PropTypes.bool,
  isAuthorized: PropTypes.bool,
};

export default ProtectedRoute;
