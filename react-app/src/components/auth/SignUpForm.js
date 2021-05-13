import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
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

  const login = () => {
    history.push('/login')
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='signup-container'>
      <div className='form-div'>
        <form onSubmit={onSignUp} className='signup-form'>
          <div className='app-header'>
            <div className='title-app'>
              Penny Pincher
            </div>
          </div>
          <div className='field'>
            <input
              type="text"
              name="username"
              placeholder='Username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='field'>
            <input
              type="text"
              name="email"
              placeholder='Email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='field'>
            <input
              type="password"
              name="password"
              placeholder='Password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='field'>
            <input
              type="password"
              name="repeat_password"
              placeholder='Confirm Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='submit-button-div'>
            <button type="submit" className='submit-button'>Sign Up</button>
          </div>
          <div className='signup-link-div'>
            <div className='go-to-signup'>Already have an account?<span className='signup-span' onClick={login}> Click Here</span>
            </div>
          </div>
        </form>

      </div>

    </div>
  );
};

export default SignUpForm;
