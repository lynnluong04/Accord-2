import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signup } from '../../store/session';
import DemoUser from '../LoginFormModal/DemoUser';
import LoginFormDiscoverModal from './LoginFormDiscoverModal';
import './SignUp.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrors([]);
      return dispatch(signup(username, email, password))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        })
      // const data = await dispatch(signup(username, email, password));
      // if (data) {
      //   setErrors(data)
    }
    return setErrors(['Repeat password field must be the same as the Password field.']);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/discover' />;
  }

  return (
    <div className='signup-container'>

      <form className='signup-form-div' onSubmit={onSignUp}>
      <div className='signup-errors' >
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='signup-title'>
          <h2 className='signup-title'> Create an account </h2>
        </div>

        <div className='signup-inputs' >
          <label>User Name</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='signup-button' type='submit'>Sign Up</button>

        <div className='have-an-account'>
          Already have an account?
          <LoginFormDiscoverModal />

        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
