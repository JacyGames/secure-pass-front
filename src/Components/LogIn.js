import {useNavigate} from 'react-router-dom';
import AuthService from '../services/authService';
import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {UserContext} from './UserContext';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';

const Login = ({setLoading}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setCurrentUser} = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLoading(true);
    e.preventDefault();
    AuthService.login(email, password).then(
        () => {
          setCurrentUser(true);
          setLoading(true);
          navigate(`../table/1`, {replace: true});
        },
    );
  };

  const changeAuthMode = () => {
    navigate(`../signUp`, {replace: true});
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          <div className="text-center">
              Not registered yet?{' '}
            <span style={{cursor: 'pointer'}}
              className="link-primary" onClick={changeAuthMode}>
                Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="btn btn-light
              btn-outline-primary" style={{marginTop: '4px', display: 'flex',
                justifyContent: 'center', alignItems: 'center'}}
              onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEye/> :
               <AiOutlineEyeInvisible/>}
              </button>
            </div>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={ handleLogin}
              type="submit" className="btn btn-primary">
                Submit
            </button>
          </div>
          <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  setLoading: PropTypes.func,
};

export default Login;
