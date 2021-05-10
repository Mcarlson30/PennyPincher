import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='nav-container'>
      <nav className='nav-bar'>
        <ul className='nav-list'>
          <div className='home-button'>
            <li>
              <NavLink to="/" id='home-link' exact={true}>
                PennyPincher
          </NavLink>
            </li>
          </div>
          {/* <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
          </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
          </NavLink>
          </li>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
          </NavLink>
          </li> */}
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default NavBar;
