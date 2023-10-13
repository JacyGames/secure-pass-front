export const ROWS_PER_PAGE = 10;
export const ORIGIN = `${process.env.
    NODE_ENV === 'development' ? 'http://localhost' :
    process.env.REACT_APP_PRODUCTION_ORIGIN}:8080/api`;
export const BASE_URL = `${ORIGIN}/Passwords`;
export const USER_TOKEN_KEY = 'user';
