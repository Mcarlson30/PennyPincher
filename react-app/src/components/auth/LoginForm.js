import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getBills } from "../../store/bills";
import { login } from "../../store/session";
import { getTransactions } from "../../store/transaction";
import background from '../../images/background.jpg'
import './LoginForm.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(getTransactions())
    dispatch(getBills())
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const signup = () => {
    history.push('/sign-up')
  }

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login-container' style={{ backgroundImage: `url(${background})` }}>
      <div className='form-div'>
        <form onSubmit={onLogin} className='login-form'>
          <div className='app-header'>
            <div className='title-app'>
              Penny Pincher
            </div>
          </div>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div className='field'>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='field'>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div >
          <div className='submit-button-div'>
            <button type="submit" className='submit-button'>Login</button>
          </div>
          <div className='demo-button-div'>
            <button type='click' onClick={demoLogin} className='demo-button'>Demo</button>
          </div>
          <div className='signup-link-div'>
            <div className='go-to-signup'>Don't have an account?<span className='signup-span' onClick={signup}> Click Here</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default LoginForm;
