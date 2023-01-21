import PropTypes from 'prop-types';

export const RESPONSE_OBJECT = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  name: PropTypes.string,
  login: PropTypes.string,
  password: PropTypes.string,
  passUserName: PropTypes.string,
  importanceLevel: PropTypes.number,
  url: PropTypes.string,
  folter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([null]),
  ]),
  createdDate: PropTypes.string,
};
