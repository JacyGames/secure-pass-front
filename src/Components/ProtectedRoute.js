import {Navigate, Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({user, redirectPath ='/home', children}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  user: PropTypes.bool,
  children: PropTypes.element,
};

export default ProtectedRoute;
