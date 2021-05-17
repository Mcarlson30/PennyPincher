import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { logout } from "../../store/session";
import '../NavBar.css'

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.use)

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };
  // if (!sessionUser) {
  //   return ''
  // }

  return <button className='logout-button' onClick={onLogout}>LOG OUT</button>;
};

export default LogoutButton;
