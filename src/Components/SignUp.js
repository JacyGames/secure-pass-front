import AuthService from '../services/authService';
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {BiError} from 'react-icons/bi';

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    passwordHint: '',
  });

  const onChange = (e) => {
    const {value, name} = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const RegisterModel = form;

  const onSubmit = () => {
    try {
      AuthService.signup(RegisterModel).then(
          navigate(`../login`, {replace: true}),
          reset,
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
              {...register('username')}
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="username"
              value={form.username}
              onChange={onChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              {...register('email', {required: 'The field cannot be empty',
                pattern: {
                // eslint-disable-next-line max-len
                  value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: 'email is not valid',
                }})}
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={onChange}
            />
            {errors.email && <div><BiError /> <span className='error'>
              {errors.email.message}</span></div>}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              {...register('password',
                  {required: 'The field cannot be empty', minLength: {
                    value: 6,
                    message: 'Password must be at least 6 character',
                  },
                  validate: (value) => {
                    return (
                      [/[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) =>
                        pattern.test(value),
                      // eslint-disable-next-line max-len
                      ) || 'Password must include upper, digit, and special chars'
                    );
                  },
                  })}
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={onChange}
            />
            {errors.password && <div><BiError /> <span className='error'>
              {errors.password.message}</span></div>}
          </div>
          <div className="form-group mt-3">
            <label>Password Hint</label>
            <input
              {...register('passwordHint')}
              type="password"
              className="form-control mt-1"
              placeholder="password hint"
              name="passwordHint"
              value={form.passwordHint}
              onChange={onChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button disabled={!isValid}
              onClick={handleSubmit(onSubmit)} type="submit"
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
