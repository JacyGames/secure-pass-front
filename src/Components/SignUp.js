import {useState} from 'react';
import AuthService from '../services/authService';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [passwordHint, setPasswordHint] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(username, email, password, passwordHint).then(
          navigate(`../login`, {replace: true}),
          window.location.reload(),
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

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h3>Sign up</h3>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="password hint"
          value={passwordHint}
          onChange={(e) => setPasswordHint(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>);
};

export default Signup;
