import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom'
import { logout } from "../../store/session";
import '../NavBar.css'

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    Redirect('/login')
  };

  return <button className='logout-button' onClick={onLogout}>LOG OUT</button>;
};

export default LogoutButton;
