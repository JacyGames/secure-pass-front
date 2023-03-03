import {Navigate, Outlet} from 'react-router-dom';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const ProtectedAuthorizedRoute = ({user, redirectPath ='/home'}) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};


ProtectedAuthorizedRoute.propTypes = {
  redirectPath: PropTypes.string,
  user: PropTypes.bool,
};

export default ProtectedAuthorizedRoute;
