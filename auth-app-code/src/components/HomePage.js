import classes from "./HomePage.module.css";

import AuthContext from "../store/auth-context";
import { useContext } from "react";
const HomePage = (props) => {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoggedIn) {
    //  console.log(authCtx.isLoggedIn);
    // window.location.href="http://localhost:3000";
  }
  return (
    <div className={classes.homePageDiv}>
      <h1 className={classes.title}>Welcome! </h1>
      <p className={classes.description}>You are now Authenticated!</p>
    </div>
  );
};

export default HomePage;
