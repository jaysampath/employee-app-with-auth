import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

const MainNavigation = (props) => {
  const authCtx = useContext(AuthContext);

  if(authCtx.isLoggedIn){
  // window.location.href="http://localhost:3000";
  }

  // const logoutHandler = () => {
  //   authCtx.logout();
  // }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Auth Task</div>
      <nav className={classes.nav}>
        <ul>
          {authCtx.isLoggedIn && (
            <li>
              <NavLink to="/home" activeClassName={classes.active}>
                {" "}
                Home{" "}
              </NavLink>
            </li>
          )}
        
        {!authCtx.isLoggedIn && <li>
            <NavLink to="/login" activeClassName={classes.active}>
              {" "}
              Login{" "}
            </NavLink>
          </li> }
        
        {!authCtx.isLoggedIn && <li>
            <NavLink to="/register" activeClassName={classes.active}>
              {" "}
              Signup{" "}
            </NavLink>
          </li>}
          
          
          {authCtx.isLoggedIn && (
            <li>
              <NavLink to="/profile" activeClassName={classes.active}>
                {" "}
                Profile{" "}
              </NavLink>
            </li>
          )}

          {/* {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandler} className={classes.logout} type="button">Logout</button>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
