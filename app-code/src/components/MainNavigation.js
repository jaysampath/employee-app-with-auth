import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AppContext from '../store/app-context';

const MainNavigation = () => {
  const appCtx = useContext(AppContext);

  const logoutHandler=()=>{
       appCtx.logout();
       window.location.href="http://localhost:3006";
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Employee App</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to='/employees' activeClassName={classes.active}>
              All Employees
            </NavLink>
          </li>
          <li>
            <NavLink to='/new-employee' activeClassName={classes.active}>
              Add an Employee
            </NavLink>
          </li>
          <li>
            <button onClick={logoutHandler} className={classes.logout}>
              Logout
            </button>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
