import AuthService from '../services/authService';
import {useNavigate} from 'react-router-dom';
import {useInput} from '../hooks/useInput';
const Signup = () => {
  const navigate = useNavigate();
  const email = useInput('', {'isEmpty': true, 'minLength': 5,
    'isEmail': true});
  const password = useInput('', {'isEmpty': true, 'minLength': 6,
    'isDigit': true, 'isUpperCase': true, 'isSymbol': true});
  const username = useInput('', {'isEmpty': true, 'minLength': 3});
  const passwordHint = useInput('', {'isEmpty': true, 'minLength': 3});
  const RegisterModel = {'username': username.value,
    'email': email.value, 'password': password.value,
    'passwordHint': passwordHint.value};

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(RegisterModel).then(
          navigate(`../login`, {replace: true}),
          (error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          },
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const changeAuthMode = () => {
    navigate(`../login`, {replace: true});
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
        Already registered?{' '}
            <span style={{cursor: 'pointer'}}
              className="link-primary" onClick={changeAuthMode}>
          Log In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={username.value}
              onChange={(e) => username.onChange(e)}
              onBlur={(e) => username.onBlur(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email.value}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
            />
          </div>
          {(email.isDirty && email.isEmpty) && <div
            style={{color: 'red', fontSize: 12}}>
          The field cannot be empty</div>}
          {(email.isDirty && !email.isEmpty && email.emailError) && <div
            style={{color: 'red', fontSize: 12}}>
            {email.value} is not valid</div>}
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password.value}
              onChange={(e) => password.onChange(e)}
              onBlur={(e) => password.onBlur(e)}
            />
          </div>
          {(password.isDirty && password.minLength) &&
          <div style={{color: 'red', fontSize: 12}}>
          Passwords must be at least 6 characters</div>}
          {(password.isDirty && password.digitError) &&
          <div style={{color: 'red', fontSize: 12}}>
          Passwords must have at least one digit</div>}
          {(password.isDirty && password.upperCaseError) && <div
            style={{color: 'red', fontSize: 12}}>
            Passwords must have at least one uppercase</div>}
          {(password.isDirty && password.symbolError) && <div
            style={{color: 'red', fontSize: 12}}>
            Passwords must have at least one non alphanumeric character</div>}
          <div className="form-group mt-3">
            <label>Password Hint</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="password hint"
              value={passwordHint.value}
              onChange={(e) => passwordHint.onChange(e)}
              onBlur={(e) => passwordHint.onBlur(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button disabled={!email.inputValid || !password.inputValid}
              onClick={handleSignup} type="submit"
              className="btn btn-primary">
          Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
