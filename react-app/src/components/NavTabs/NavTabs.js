import React from 'react';
import { NavLink } from 'react-router-dom';
import "./NavTabs.css";

const NavTabs = () => {
    return (
        <div className="nav-tabs-contianer">
            <div className='nav-tabs'>
                <NavLink to='/' exact={true} className='nav-link' activeClassName='active'>
                    Overview</NavLink>
            </div>
            <div className='nav-tabs'>
                <NavLink to='/transactions' exact={true} className='nav-link' activeClassName='active'>
                    Transactions</NavLink>
            </div>
            <div className='nav-tabs'>
                <NavLink to='/bills' exact={true} className='nav-link' activeClassName='active'>
                    Bills</NavLink>
            </div>
            <div className='nav-tabs'>
                <NavLink to='/budgets' exact={true} className='nav-link' activeClassName='active'>
                    Budget</NavLink>
            </div>
        </div>
    );
}

export default NavTabs;